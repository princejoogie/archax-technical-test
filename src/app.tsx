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

const transformData = (data: DataShape[]) => {
  console.log("transformData called");
  return data;
};

function App() {
  const records = useFetch<DataShape[]>("http://localhost:8080/data");
  const transformed = useMemo(() => {
    if (records.data) {
      return transformData(records.data);
    }
    return [];
  }, [records.data]);

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
