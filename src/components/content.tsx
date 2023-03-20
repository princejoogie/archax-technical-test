import { useRecords } from "../contexts/record-context";

const Content = () => {
  const { filteredRecords } = useRecords();

  return (
    <div className="flex-1">
      <div className="flex gap-4 flex-wrap">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((e) => (
            <div key={e.id} className="border p-4">
              <p>{e.name}</p>
              <p>${e.spend}</p>
              <p>1: {e.BCAP1}</p>
              <p>2: {e.BCAP2}</p>
              <p>3: {e.BCAP3}</p>
            </div>
          ))
        ) : (
          <p>Please select a capability</p>
        )}
      </div>
    </div>
  );
};

export default Content;
