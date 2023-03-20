import { useMemo } from "react";
import { useRecords } from "../contexts/record-context";
import Tree from "../components/tree";

import type { ITree, DataShape } from "../types";

const getTreeLabels = (data: {
  lev1KeyArr: string[];
  lev2KeyArr: string[];
  lev3KeyArr: string[];
}) => {
  const rootTrees: ITree[] = [];

  data.lev1KeyArr.forEach((lev1Key) => {
    const rootTree: ITree = {
      name: lev1Key,
      children: [],
    };

    rootTrees.push(rootTree);

    data.lev2KeyArr.forEach((lev2Key) => {
      if (lev2Key.startsWith(lev1Key + ".")) {
        const childTree: ITree = {
          name: lev2Key,
          children: [],
        };

        rootTree.children.push(childTree);

        data.lev3KeyArr.forEach((lev3Key) => {
          if (lev3Key.startsWith(lev2Key + ".")) {
            const grandChildTree = {
              name: lev3Key,
              children: [],
            };

            childTree.children.push(grandChildTree);
          }
        });
      }
    });
  });

  return rootTrees;
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

const Sidebar = () => {
  const { records } = useRecords();
  const trees = useMemo(() => {
    if (records) {
      return getKeys(records);
    }
    return [];
  }, [records]);

  return (
    <div>
      <div>
        {trees.map((e) => (
          <Tree {...e} idx={0} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
