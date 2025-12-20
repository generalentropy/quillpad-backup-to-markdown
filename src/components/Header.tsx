import { AiFillFileMarkdown } from "react-icons/ai";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuFileJson } from "react-icons/lu";

export default function Header() {
  return (
    <div className="mx-4 flex flex-col items-center justify-center">
      <p className="my-4 flex items-center text-center text-4xl font-bold tracking-tight text-blue-950">
        Quillpad conversion tool
      </p>
      <p className="text-center text-lg font-semibold text-gray-600">
        Convert your Quillpad backup into Markdown
      </p>
      <div className="my-4 flex items-center justify-center text-7xl text-blue-950 lg:my-8">
        <LuFileJson />
        <FaLongArrowAltRight size={30} className="mx-6" />
        <AiFillFileMarkdown />
      </div>
    </div>
  );
}
