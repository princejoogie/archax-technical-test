import { useMemo, useState, useEffect } from "react";
import { useRecords } from "../contexts/record-context";
import NavigationTree from "./navigation-tree";

import type { ITree, DataShape } from "../types";
import useThrottle from "../hooks/useThrottle";

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
  const { records, range, rangeValue, setRangeValue } = useRecords();
  const [localRangeValue, setLocalRangeValue] = useState(rangeValue);
  const throttled = useThrottle(localRangeValue);
  const [min, max] = range;
  const trees = useMemo(() => {
    if (records) {
      return getKeys(records);
    }
    return [];
  }, [records]);

  useEffect(() => {
    setRangeValue(throttled);
  }, [throttled, setRangeValue]);

  return (
    <nav className="h-screen flex flex-col px-4 pt-4 bg-white border-r border-gray-300">
      <h3 className="font-bold ml-3">Navigation</h3>

      <div className="flex-1 flex flex-col overflow-y-auto hide-sb pb-4">
        <div className="flex-1">
          {trees.map((e) => (
            <NavigationTree {...e} key={e.name} idx={0} />
          ))}
        </div>

        <div>
          <h5 className="font-semibold">Filters</h5>
          <p className="text-sm">{`Spending: >= $${localRangeValue}`}</p>

          <div className="mt-2">
            <input
              disabled={min === max}
              className="w-full"
              type="range"
              min={min}
              max={max}
              value={localRangeValue}
              onChange={(e) => setLocalRangeValue(Number(e.target.value))}
            />
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>${min}</span>
              <span>${max}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
