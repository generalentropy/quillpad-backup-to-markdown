import { useFileStore } from "../store/FileStore";

export default function Options() {
  const sortByNotebookName = useFileStore((state) => state.sortByNotebookName);
  const setSortByNotebookName = useFileStore(
    (state) => state.setSortByNotebookName,
  );
  const setRemoveMedia = useFileStore((state) => state.setRemoveMedia);
  const removeMedia = useFileStore((state) => state.removeMedia);

  return (
    <div className="mt-4 flex select-none flex-col justify-center px-1 font-semibold text-gray-600">
      <label>
        <input
          type="checkbox"
          checked={sortByNotebookName}
          onChange={setSortByNotebookName}
          className="mx-2 cursor-pointer"
        />
        Create a separate folder for each notebook in Quillpad ?
      </label>

      <label>
        <input
          type="checkbox"
          checked={removeMedia}
          onChange={setRemoveMedia}
          className="mx-2 cursor-pointer"
        />
        Remove media files and include only notes.
      </label>
    </div>
  );
}
