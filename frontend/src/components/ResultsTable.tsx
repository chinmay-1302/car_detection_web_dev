import { useEffect, useState } from "react";

type ResultsTableProps = {
  org_data: [];
  pred_data: [];
}

const ResultsTable: React.FC<ResultsTableProps> = ({org_data, pred_data}) => {
  const [active, setActive] = useState(0);
  const [activeTotalCount, setActiveTotalCount] = useState(0);
  console.log(org_data.length, pred_data.length);
  console.log(pred_data[0]);
  console.log(org_data[0]);

  const imageNames = org_data.map((data) => data.name);

  useEffect(() => {
    const totalCount = pred_data[active][1]['bicycles'] + pred_data[active][1]['cars'] + pred_data[active][1]['motorcycles'] + pred_data[active][1]['buses'] + pred_data[active][1]['trucks'];
    setActiveTotalCount(totalCount);
    console.log(activeTotalCount);
  }
  , [active]);

  return (
    <div className="w-full h-full flex flex-col gap-0 p-8 bg-white overflow-x-hidden">
    {/* table header */}
    <div className="flex flex-row w-full h-fit p-6 justify-between align-middle border-[1px] border-surface rounded-t-xl">
      <h3 className="text-slate-800 text-2xl font-bold">
        Processed Images
      </h3>
    </div>
    {/* table body */}
    <div className="flex flex-row w-full flex-1 justify-start align-top border-[1px] border-surface rounded-b-xl"> 
      <div className="flex flex-row items-start gap-4">
        <div className="flex flex-col w-1/5 h-full border-r-[1px] border-surface">
          <div className="flex w-full items-center justify-center p-3 bg-secondary text-lg font-bold">
            Defects
          </div>
          <div className="flex flex-col py-2 px-2 gap-2">
            {imageNames.map((data, index) => (
              <div onClick={() => setActive(index)} className={`overflow-hidden cursor-pointer flex py-3 px-4 rounded-sm hover:bg-muted ${active === index ? 'bg-muted' : ''}`}>
                {data}
              </div>
            ))}
          </div>
        </div>
        <div className="w-4/5 flex flex-col p-0 m-0">
          <div className="w-full flex flex-row gap-8 p-8">
            <div className="flex flex-col flex-1 items-center justify-center rounded-md bg-muted">
              <p className="flex px-3 pt-2 font-semibold text-base">Original</p>
              <div className="flex p-2 items-center justify-center">
                <img src={URL.createObjectURL(org_data[active])} className="rounded-lg object-fill" />
              </div>
            </div>
            <div className="flex flex-col flex-1 items-center justify-center rounded-md bg-muted">
              <p className="flex px-3 pt-2 font-semibold text-base">Processed</p>
              <div className="flex p-2 items-center justify-center">
                <img src={"data:image/jpeg;base64," + pred_data[active][0]} className="rounded-lg object-fill" />
              </div>
            </div>
          </div>
          <div className="w-full flex px-8 pb-8 items-start justify-center">
            <div className="flex flex-col items-center">
              <p className="font-semibold text-lg">Total Count: {activeTotalCount}</p>
              <div className="flex w-full flex-wrap gap-4 text-center items-center justify-center">
                <p>Bicycles: {pred_data[active][1]['bicycles']}</p>
                <p>Cars: {pred_data[active][1]['cars']}</p>
                <p>Motorcycles: {pred_data[active][1]['motorcycles']}</p>
                <p>Buses: {pred_data[active][1]['buses']}</p>
                <p>Trucks: {pred_data[active][1]['trucks']}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ResultsTable