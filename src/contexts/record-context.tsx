import { ReactNode, createContext, useState, useContext, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import type { DataShape } from "../types";

export const recordsContext = createContext<{
  range: [number, number];
  rangeValue: number;
  setRangeValue: React.Dispatch<React.SetStateAction<number>>;
  records: DataShape[];
  filteredRecords: DataShape[];
  selectedCapability: string;
  setSelectedCapability: React.Dispatch<React.SetStateAction<string>>;
}>({
  range: [0, 0],
  rangeValue: 0,
  setRangeValue: () => {},
  records: [],
  filteredRecords: [],
  selectedCapability: "",
  setSelectedCapability: () => {},
});

export const RecordProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useFetch<DataShape[]>("http://localhost:8080/data");
  const [selectedCapability, setSelectedCapability] = useState("");
  const [range, setRange] = useState<[number, number]>([0, 0]);
  const [rangeValue, setRangeValue] = useState(0);

  // filter records by selected capability
  const filteredRecords = useMemo(() => {
    if (!selectedCapability || !data) {
      return [];
    }

    const filtered = data
      .filter(
        (e) =>
          e.BCAP1 === selectedCapability ||
          e.BCAP2 === selectedCapability ||
          e.BCAP3 === selectedCapability
      )
      .sort((a, b) => a.spend - b.spend);

    const min = Math.min(...filtered.map((e) => e.spend));
    const max = Math.max(...filtered.map((e) => e.spend));

    setRangeValue(min);
    setRange([min, max]);
    return filtered;
  }, [selectedCapability, data]);

  // filter records by range
  const filteredOnRange = useMemo(() => {
    return filteredRecords.filter((e) => e.spend >= rangeValue);
  }, [rangeValue, filteredRecords]);

  return (
    <recordsContext.Provider
      value={{
        range,
        rangeValue,
        setRangeValue,
        records: data ?? [],
        filteredRecords: filteredOnRange,
        selectedCapability,
        setSelectedCapability,
      }}
    >
      {children}
    </recordsContext.Provider>
  );
};

// hook to use records context without explicitly importing useContext and recordsContext everytime
export const useRecords = () => useContext(recordsContext);
