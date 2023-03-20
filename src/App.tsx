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
  const data = useFetch<DataShape[]>("http://localhost:8080/data");

  console.log(data);

  return (
    <div>
      <h1>React Coding Exercise</h1>
    </div>
  );
}

export default App;
