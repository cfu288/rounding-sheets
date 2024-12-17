import { PropsWithChildren } from "react";

interface NavbarProps extends PropsWithChildren<{}> {
  isAbsolute?: boolean;
}

export const Navbar = ({ children, isAbsolute = false }: NavbarProps) => {
  return (
    <>
      <nav
        className={`${
          isAbsolute ? "absolute" : "sticky"
        } top-0 w-full transition-all duration-300 backdrop-blur-md bg-white/70 shadow-md py-2 z-50`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <h2 className="font-semibold tracking-tight text-gray-900 transition-all duration-300 text-xl">
            <a href="/">Reverb</a>
          </h2>
          <div className="space-x-4">
            <a href="/" className="text-gray-900 hover:text-gray-600">
              Home
            </a>
            {children}
          </div>
        </div>
      </nav>
      {isAbsolute && (
        <div className="opacity-0 py-2">
          <nav className="top-0 w-full">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
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
    </>
  );
};
