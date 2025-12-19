import { useFileStore } from "../store/FileStore";

type ToggleProps = {
  checked: boolean;
  onChange: () => void;
  title: string;
  description?: string;
};

function Toggle({ checked, onChange, title, description }: ToggleProps) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 py-3">
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-blue-950">{title}</span>
        {description ? (
          <span className="mt-1 text-sm font-normal text-blue-900/70">
            {description}
          </span>
        ) : null}
      </span>

      <span className="relative mt-0.5 inline-flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span className="h-6 w-11 rounded-full bg-blue-950/20 transition-colors peer-checked:bg-blue-600 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-600" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

export default function Options() {
  const sortByNotebookName = useFileStore((state) => state.sortByNotebookName);
  const setSortByNotebookName = useFileStore(
    (state) => state.setSortByNotebookName,
  );
  const setRemoveMedia = useFileStore((state) => state.setRemoveMedia);
  const removeMedia = useFileStore((state) => state.removeMedia);
  const displayImagesInline = useFileStore(
    (state) => state.displayImagesInline,
  );
  const setDisplayImagesInline = useFileStore(
    (state) => state.setDisplayImagesInline,
  );

  return (
    <div className="mt-4 w-full max-w-[632px] rounded-2xl border border-blue-950/10 bg-white/40 p-4 shadow-sm backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-lg font-bold tracking-tight text-blue-950">
          Options
        </p>
      </div>

      <div className="divide-y divide-blue-950/10">
        <Toggle
          checked={sortByNotebookName}
          onChange={setSortByNotebookName}
          title="Organize notes into folders"
          description="Create a separate folder for each notebook."
        />
        <Toggle
          checked={removeMedia}
          onChange={setRemoveMedia}
          title="Exclude media files"
          description="Only export notes (no attachments in the ZIP)."
        />
        <Toggle
          checked={displayImagesInline}
          onChange={setDisplayImagesInline}
          title="Show attached images inline"
          description="Render image attachments as images in the Attachments section (not links)."
        />
      </div>
    </div>
  );
}
