import Content from "./components/content";
import Sidebar from "./components/sidebar";
import { RecordProvider } from "./contexts/record-context";

function App() {
  return (
    <RecordProvider>
      <div className="container mx-auto px-4">
        <h1>Navigation</h1>
        <div className="flex gap-4">
          <Sidebar />
          <Content />
        </div>
      </div>
    </RecordProvider>
  );
}

export default App;
