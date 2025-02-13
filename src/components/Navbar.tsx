import { PropsWithChildren, useState } from "react";
import { SettingsModal } from "./BPTable/SettingsModal";

interface NavbarProps extends PropsWithChildren {
  isAbsolute?: boolean;
}

export const Navbar = ({ children, isAbsolute = false }: NavbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav
        className={`${
          isAbsolute ? "absolute" : "sticky"
        } top-0 w-full transition-all duration-300 backdrop-blur-md bg-white/70 shadow-md py-2 z-50`}
      >
        <div className="container mx-auto px-6 lg:px-8 flex justify-between items-center">
          <h2 className="font-semibold tracking-tight text-gray-900 transition-all duration-300 text-xl">
            <a href="/">Reverb</a>
          </h2>
          <div className="space-x-4 flex items-center">
            <a href="/" className="text-gray-900 hover:text-gray-600">
              Home
            </a>
            <span
              className="material-icons text-gray-700 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </span>
            {children}
          </div>
        </div>
      </nav>
      {isAbsolute && (
        <div className="opacity-0 py-2">
          <nav className="top-0 w-full">
            <div className="container mx-auto px-6 lg:px-8 flex justify-between items-center">
              <h2 className="font-semibold tracking-tight text-gray-900 text-xl">
                Reverb
              </h2>
              <div className="space-x-4">
                <a href="/" className="text-gray-900">
                  Home
                </a>
                {children}
              </div>
            </div>
          </nav>
        </div>
      )}
      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
