import FileDropZone from "./components/FileDropZone";
import Header from "./components/Header";
import Info from "./components/Info";
import Options from "./components/Options";
import ProcessButton from "./components/ProcessButton";

export function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-blue-200 p-2">
      <Header />
      <Info />
      <FileDropZone />
      <Options />
      <ProcessButton />
    </div>
  );
}
