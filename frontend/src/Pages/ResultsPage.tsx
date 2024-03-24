import Navbar from "@/components/Navbar";
import ResultsTable from "@/components/ResultsTable";
import { useLocation } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  return (
    <>
      <Navbar upload={() => {}} state="viewUpload" />
      <div className="flex-1 w-full flex flex-col items-center justify-center bg-white overflow-x-hidden">
        <ResultsTable org_data={location.state.org_data} pred_data={location.state.pred_data.predicted} />
      </div>
    </>
  )
}

export default ResultsPage