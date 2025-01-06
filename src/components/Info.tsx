import { FaLock } from "react-icons/fa";

export default function Info() {
  return (
    <div className="mx-2 my-6 flex max-w-[600px] items-center rounded-lg border border-emerald-400 bg-emerald-300/50 p-4 text-emerald-700">
      <FaLock size={40} className="mx-4 hidden sm:block" />
      <p className="px-4 text-start">
        The conversion is processed directly in your browser, ensuring that your
        data never leaves your device
      </p>
    </div>
  );
}
