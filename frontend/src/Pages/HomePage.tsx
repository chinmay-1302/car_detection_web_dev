import Navbar from "@/components/Navbar"
import UploadTable from "@/components/UploadTable"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleApiRequest = async () => {
    const formData = new FormData();
    files.forEach(file => {
      console.log(file);
      formData.append('images', file);
    });
    setLoading(true);
    try {
      console.log(formData.images)
      const res = await axios.post('http://localhost:3000/predict',formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      // navigator('/results');
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);


  return (
    <>
      <Navbar upload={handleApiRequest} />
      <div className="flex-1 w-full flex flex-col items-center justify-center bg-white overflow-x-hidden">
        <UploadTable files={files} setFiles={setFiles} />
      </div>
    </>
  )
}

export default HomePage
