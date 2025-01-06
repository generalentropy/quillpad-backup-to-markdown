import { LuGithub, LuMessageCircle } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-blue-100 px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="00 text-sm text-slate-600">
            Quillpad conversion tool - JSON to Markdown
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/generalentropy/quillpad-backup-to-markdown"
              className="flex items-center space-x-2 text-slate-600 transition-colors hover:text-slate-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LuGithub size={18} />
              <span className="text-sm">Contribute</span>
            </a>

            <a
              href="https://github.com/generalentropy/quillpad-backup-to-markdown/issues"
              className="flex items-center space-x-2 text-slate-600 transition-colors hover:text-slate-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LuMessageCircle size={18} />
              <span className="text-sm">Suggest improvement</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
