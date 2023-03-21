import Content from "./components/content";
import Sidebar from "./components/sidebar";
import { RecordProvider } from "./contexts/record-context";

function App() {
  return (
    <RecordProvider>
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex flex-col flex-1 overflow-y-auto">
          <div className="flex-1">
            <Content />
          </div>

          <footer className="bg-white border-t border-gray-300 w-full text-xs p-2">
            <p>
              Made by{" "}
              <a
                rel="noreferrer"
                target="_blank"
                href="https://github.com/princejoogie"
                className="text-blue-700"
              >
                Prince Carlo Juguilon
              </a>{" "}
              <span>&#169; {new Date().getFullYear()}</span>
            </p>
          </footer>
        </div>
      </div>
    </RecordProvider>
  );
}

export default App;
