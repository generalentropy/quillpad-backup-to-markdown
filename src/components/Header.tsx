import { AiFillFileMarkdown } from "react-icons/ai";

import { FaLongArrowAltRight } from "react-icons/fa";
import { LuFileJson } from "react-icons/lu";

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="my-4 flex items-center text-center text-4xl font-bold tracking-tight text-blue-950">
        Quillpad conversion tool
      </p>
      <div className="flex items-center text-7xl text-blue-950">
        <LuFileJson />
        <FaLongArrowAltRight size={30} className="mx-6" />
        <AiFillFileMarkdown />
      </div>
    </div>
  );
}
