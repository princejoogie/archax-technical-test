import { useRecords } from "../contexts/record-context";

const Content = () => {
  const { filteredRecords, selectedCapability } = useRecords();

  return (
    <div className="flex-1 p-4">
      <h1 className="font-bold">
        {filteredRecords.length > 0
          ? `${selectedCapability} (${filteredRecords.length})`
          : "Please select a capability"}
      </h1>

      <div className="flex gap-4 flex-wrap mt-4">
        {filteredRecords.map((e) => (
          <div key={e.id} className="border bg-white border-gray-300 rounded-lg p-4">
            <h4 className="text-center">{e.name}</h4>
            <p className="text-center text-sm text-gray-600">${e.spend}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
