import { useFileStore } from "../store/FileStore";

export default function Options() {
  const sortByNotebookName = useFileStore((state) => state.sortByNotebookName);
  const setSortByNotebookName = useFileStore(
    (state) => state.setSortByNotebookName,
  );

  return (
    <div className="mt-4 flex select-none font-semibold text-gray-600">
      <label>
        <input
          type="checkbox"
          checked={sortByNotebookName}
          onChange={setSortByNotebookName}
          className="mx-2 cursor-pointer"
        />
        Create a separate folder for each notebook in Quillpad ?
      </label>
    </div>
  );
}
