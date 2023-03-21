import { ReactNode, useState } from "react";
import { useRecords } from "../contexts/record-context";
import type { ITree } from "../types";

interface IconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: ReactNode;
}

const IconButton = ({ icon, ...rest }: IconButtonProps) => {
  return (
    <button
      {...rest}
      className={`h-6 w-6 hover:bg-gray-200 transition-colors grid place-items-center focus:outline-none rounded-md`}
    >
      {icon}
    </button>
  );
};

const NavigationTree = ({ name, children, idx }: ITree & { idx: number }) => {
  const { selectedCapability, setSelectedCapability } = useRecords();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginLeft: `${idx * 15}px` }} className="select-none">
      <div
        className={`flex rounded-md mt-1 p-1 items-center transition-colors hover:bg-gray-100 ${
          selectedCapability === name
            ? "bg-gray-100 text-black"
            : "bg-transparent text-gray-600"
        }`}
      >
        {children.length > 0 && (
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        )}
        <button
          className="h-6 rounded-md focus:outline-none pr-2"
          onClick={() => {
            setSelectedCapability(name);
            if (!isOpen) setIsOpen(true);
          }}
        >
          {name}
        </button>
      </div>
      {isOpen && (
        <div>
          {children.map((e) => (
            <NavigationTree {...e} key={e.name} idx={idx + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationTree;
