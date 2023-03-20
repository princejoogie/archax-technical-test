import { useState } from "react";
import { useRecords } from "../contexts/record-context";
import type { ITree } from "../types";

const Tree = ({ name, children, idx }: ITree & { idx: number }) => {
  const { setSelectedCapability } = useRecords();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginLeft: `${idx * 15}px`, marginTop: "15px" }}>
      <button
        className="bg-gray-200 px-4 py-2"
        onClick={() => {
          setIsOpen(!isOpen);
          setSelectedCapability(name);
        }}
      >
        {name}
      </button>
      {isOpen && (
        <div>
          {children.map((e) => (
            <Tree {...e} idx={idx + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tree;
