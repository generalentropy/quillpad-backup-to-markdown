import { expect, test } from "@playwright/test";
import JSZip from "jszip";
import { readFile } from "node:fs/promises";

const notes = [
  {
    title: "Example",
    content: "A note with **Markdown**.",
    notebookId: 1,
    attachments: [
      { type: "image/png", fileName: "photo.png", description: "Photo" },
      { type: "application/pdf", fileName: "media/document.pdf" },
    ],
  },
  { title: "Example", content: "Duplicate title.", notebookId: 1 },
  { title: "", content: "Untitled note.", notebookId: 0 },
];

async function backup(includeNotebooks = true) {
  const zip = new JSZip();
  zip.file(
    "backup.json",
    JSON.stringify({
      notes,
      ...(includeNotebooks ? { notebooks: [{ id: 1, name: "Work" }] } : {}),
    }),
  );
  zip.file("media/photo.png", "image fixture");
  zip.file("media/document.pdf", "document fixture");
  return zip.generateAsync({ type: "nodebuffer" });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("converts a backup with duplicate and untitled notes and media", async ({
  page,
}) => {
  const browserErrors: string[] = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));
  await expect(
    page.getByRole("button", { name: "Convert and download" }),
  ).toHaveCount(0);
  await page.screenshot({
    path: test.info().outputPath("app.png"),
    fullPage: true,
  });
  await page.locator('input[type="file"]').setInputFiles({
    name: "backup.zip",
    mimeType: "application/zip",
    buffer: await backup(),
  });

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Convert and download" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(
    /^converted_notes_\d{4}-\d{2}-\d{2}_[\da-f-]{36}\.zip$/,
  );
  const zip = await JSZip.loadAsync(await readFile((await download.path())!));
  const files = Object.keys(zip.files).filter((name) => !zip.files[name].dir);
  expect(files).toEqual(
    expect.arrayContaining([
      "Example.md",
      "Example-2.md",
      "media/photo.png",
      "media/document.pdf",
    ]),
  );
  expect(files).toHaveLength(5);
  expect(
    files.filter((name) => /^unnamed-[\da-f-]{36}\.md$/.test(name)),
  ).toHaveLength(1);
  const markdown = await zip.file("Example.md")!.async("string");
  expect(markdown).toContain("A note with **Markdown**.");
  expect(markdown).toContain("**Notebook:** Work");
  expect(markdown).toContain("- [Photo](media/photo.png)");
  expect(markdown).toContain("- [media/document.pdf](media/document.pdf)");
  expect(await zip.file("media/photo.png")!.async("string")).toBe(
    "image fixture",
  );
  expect(browserErrors).toEqual([]);
});

for (const includeNotebooks of [true, false]) {
  for (const removeMedia of [true, false]) {
    test(`exports folders and inline images, notebooks=${includeNotebooks}, removeMedia=${removeMedia}`, async ({
      page,
    }) => {
      await page
        .getByText("Organize notes into folders", { exact: true })
        .click();
      await expect(
        page.getByRole("checkbox", { name: "Organize notes into folders" }),
      ).toBeChecked();
      await page
        .getByText("Show attached images inline", { exact: true })
        .click();
      await expect(
        page.getByRole("checkbox", { name: "Show attached images inline" }),
      ).toBeChecked();
      if (removeMedia) {
        await page
          .getByRole("checkbox", { name: "Exclude media files" })
          .press("Space");
        await expect(
          page.getByRole("checkbox", { name: "Exclude media files" }),
        ).toBeChecked();
      }
      await page.locator('input[type="file"]').setInputFiles({
        name: "backup.zip",
        mimeType: "application/zip",
        buffer: await backup(includeNotebooks),
      });
      const downloadPromise = page.waitForEvent("download");
      await page.getByRole("button", { name: "Convert and download" }).click();
      const download = await downloadPromise;
      const zip = await JSZip.loadAsync(
        await readFile((await download.path())!),
      );
      const folder = includeNotebooks ? "Work" : "No Folder";
      const markdown = await zip.file(`${folder}/Example.md`)!.async("string");
      expect(markdown).toContain("![Photo](../media/photo.png)");
      expect(markdown).toContain(
        "- [media/document.pdf](../media/document.pdf)",
      );
      expect(zip.file(`${folder}/Example-2.md`)).not.toBeNull();
      expect(zip.file("media/photo.png") !== null).toBe(!removeMedia);
      expect(zip.file("media/document.pdf") !== null).toBe(!removeMedia);
      const unnamedNote = Object.keys(zip.files).find((name) =>
        /^No Folder\/unnamed-[\da-f-]{36}\.md$/.test(name),
      );
      expect(unnamedNote).toBeDefined();
    });
  }
}

test("rejects a file with an unsupported format", async ({ page }) => {
  await page.locator('input[type="file"]').setInputFiles({
    name: "backup.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("invalid backup"),
  });
  await expect(
    page.getByText("Wrong format, only ZIP files are accepted."),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Convert and download" }),
  ).toHaveCount(0);
});

test("reports an archive without backup JSON and allows retrying", async ({
  page,
}) => {
  const invalidZip = new JSZip();
  invalidZip.file("readme.txt", "not a Quillpad backup");
  await page.locator('input[type="file"]').setInputFiles({
    name: "invalid.zip",
    mimeType: "application/zip",
    buffer: await invalidZip.generateAsync({ type: "nodebuffer" }),
  });
  const convertButton = page.getByRole("button", {
    name: "Convert and download",
  });
  await convertButton.click();
  await expect(
    page.getByText("Error: No JSON found in the ZIP archive."),
  ).toBeVisible();
  await expect(convertButton).toBeEnabled();
  await page.locator('input[type="file"]').setInputFiles({
    name: "backup.zip",
    mimeType: "application/zip",
    buffer: await backup(),
  });
  const downloadPromise = page.waitForEvent("download");
  await convertButton.click();
  await downloadPromise;
  await expect(page.getByText("Error:", { exact: false })).toHaveCount(0);
});
