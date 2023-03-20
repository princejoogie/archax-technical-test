import useFetch from "./useFetch";

type DataShape = {
  id: string;
  name: string;
  spend: number;
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
};

function App() {
  const records = useFetch<DataShape[]>("http://localhost:8080/data");

  return (
    <div>
      <h1>React Coding Exercise</h1>

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
