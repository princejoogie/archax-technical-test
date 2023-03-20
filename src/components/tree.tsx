import { useState } from "react";
import type { ITree } from "../types";

const Tree = ({ name, children, idx }: ITree & { idx: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginLeft: `${idx * 15}px`, marginTop: "15px" }}>
      <button onClick={() => setIsOpen(!isOpen)}>{name}</button>
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
