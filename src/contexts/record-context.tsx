import { ReactNode, createContext, useState, useContext, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import type { DataShape } from "../types";

export const recordsContext = createContext<{
  records: DataShape[];
  filteredRecords: DataShape[];
  selectedCapability: string;
  setSelectedCapability: React.Dispatch<React.SetStateAction<string>>;
}>({
  records: [],
  filteredRecords: [],
  selectedCapability: "",
  setSelectedCapability: () => {},
});

export const RecordProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useFetch<DataShape[]>("http://localhost:8080/data");
  const [selectedCapability, setSelectedCapability] = useState("");
  const filteredRecords = useMemo(() => {
    if (!selectedCapability || !data) {
      return [];
    }

    return data.filter(
      (e) =>
        e.BCAP1 === selectedCapability ||
        e.BCAP2 === selectedCapability ||
        e.BCAP3 === selectedCapability
    );
  }, [selectedCapability, data]);

  return (
    <recordsContext.Provider
      value={{
        records: data ?? [],
        filteredRecords,
        selectedCapability,
        setSelectedCapability,
      }}
    >
      {children}
    </recordsContext.Provider>
  );
};

export const useRecords = () => useContext(recordsContext);
