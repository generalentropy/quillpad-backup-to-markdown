import { AiFillFileMarkdown } from "react-icons/ai";
import { FaLock, FaLongArrowAltRight } from "react-icons/fa";
import { LuFileJson } from "react-icons/lu";

export default function Info() {
  return (
    <div>
      <div className="flex items-center justify-center text-7xl text-blue-950">
        <LuFileJson />
        <FaLongArrowAltRight size={30} className="mx-6" />
        <AiFillFileMarkdown />
      </div>
      <div className="mx-4 my-6 flex max-w-[600px] items-center rounded-lg border border-emerald-400 bg-emerald-300/50 p-4 text-emerald-700">
        <FaLock size={40} className="mx-4 hidden sm:block" />
        <p className="px-4 text-start">
          The conversion is processed directly in your browser, ensuring that
          your data never leaves your device
        </p>
      </div>
    </div>
  );
}
