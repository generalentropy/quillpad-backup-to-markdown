import FileDropZone from "./components/FileDropZone";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Info from "./components/Info";
import Options from "./components/Options";
import ProcessButton from "./components/ProcessButton";

export function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-200">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <Info />
        <FileDropZone />
        <Options />
        <ProcessButton />
      </div>
      <Footer />
    </div>
  );
}
