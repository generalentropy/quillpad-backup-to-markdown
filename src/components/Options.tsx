import { useFileStore } from "../store/FileStore";

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
    <div className="mt-4 flex w-full select-none flex-col justify-center gap-1 border font-semibold text-gray-600">
      <p className="text-xl font-bold text-gray-800"> Options</p>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          checked={sortByNotebookName}
          onChange={setSortByNotebookName}
          className="mx-2 cursor-pointer"
        />
        Create a separate folder for each notebook in Quillpad&nbsp;?
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          checked={removeMedia}
          onChange={setRemoveMedia}
          className="mx-2 cursor-pointer"
        />
        Remove media files and include only notes.
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          checked={displayImagesInline}
          onChange={setDisplayImagesInline}
          className="mx-2 cursor-pointer"
        />
        Display image attachments inline in Markdown.
      </label>
    </div>
  );
}
