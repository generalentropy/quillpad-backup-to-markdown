import { FaLock } from "react-icons/fa";

export default function Info() {
  return (
    <div>
      <div className="my-6 flex max-w-[600px] items-center rounded-lg border-2 border-dotted border-emerald-400 bg-emerald-300/50 p-4 text-emerald-700 md:p-6">
        <FaLock size={40} className="mx-4 hidden sm:block" />
        <p className="ptext-start">
          The conversion is processed directly in your browser, ensuring that
          your data never leaves your device
        </p>
      </div>
    </div>
  );
}
