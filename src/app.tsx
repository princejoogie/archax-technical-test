import { useMemo, useState } from "react";
import useFetch from "./hooks/useFetch";

type DataShape = {
  id: string;
  name: string;
  spend: number;
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
};

type TreeArgs = {
  id: string;
  name: string;
  spend: number;
};

export class Tree {
  id: string;
  name: string;
  spend: number;
  children: Tree[];

  constructor({ id, name, spend }: TreeArgs) {
    this.id = id;
    this.name = name;
    this.spend = spend;
    this.children = [];
  }

  addChild(args: TreeArgs) {
    const child = new Tree(args);
    this.children.push(child);
    return child;
  }
}

type Node = {
  name: string;
  children: Node[];
};

const getTreeLabels = (data: {
  lev1KeyArr: string[];
  lev2KeyArr: string[];
  lev3KeyArr: string[];
}) => {
  const rootNodes: Node[] = [];

  data.lev1KeyArr.forEach((lev1Key) => {
    const rootNode: Node = {
      name: lev1Key,
      children: [],
    };

    rootNodes.push(rootNode);

    data.lev2KeyArr.forEach((lev2Key) => {
      if (lev2Key.startsWith(lev1Key + ".")) {
        const childNode: Node = {
          name: lev2Key,
          children: [],
        };

        rootNode.children.push(childNode);

        data.lev3KeyArr.forEach((lev3Key) => {
          if (lev3Key.startsWith(lev2Key + ".")) {
            const grandChildNode = {
              name: lev3Key,
              children: [],
            };

            childNode.children.push(grandChildNode);
          }
        });
      }
    });
  });

  return rootNodes;
};

const getKeys = (data: DataShape[]) => {
  const lev1KeySet = new Set<string>();
  const lev2KeySet = new Set<string>();
  const lev3KeySet = new Set<string>();

  data.forEach((e) => {
    if (!lev1KeySet.has(e.BCAP1)) {
      lev1KeySet.add(e.BCAP1);
    }
    if (!lev2KeySet.has(e.BCAP2)) {
      lev2KeySet.add(e.BCAP2);
    }
    if (!lev3KeySet.has(e.BCAP3)) {
      lev3KeySet.add(e.BCAP3);
    }
  });

  const lev1KeyArr = Array.from(lev1KeySet).sort();
  const lev2KeyArr = Array.from(lev2KeySet).sort();
  const lev3KeyArr = Array.from(lev3KeySet).sort();

  return getTreeLabels({ lev1KeyArr, lev2KeyArr, lev3KeyArr });
};

function App() {
  const records = useFetch<DataShape[]>("http://localhost:8080/data");
  const nodes = useMemo(() => {
    if (records.data) {
      return getKeys(records.data);
    }
    return [];
  }, [records.data]);
  console.log(records.data);
  console.log(nodes);

  const [text, setText] = useState("");

  return (
    <div>
      <h1>React Coding Exercise</h1>

      <input value={text} onChange={(e) => setText(e.target.value)} />

      <div>
        {records.isLoading ? (
          <p>Loading...</p>
        ) : records.error ? (
          <p>Error: {records.error.message}</p>
        ) : (
          records.data?.map((e) => <p key={e.id}>{JSON.stringify(e)}</p>)
        )}
      </div>
    </div>
  );
}

export default App;
