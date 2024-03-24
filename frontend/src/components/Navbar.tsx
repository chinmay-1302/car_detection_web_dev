import { Button } from "./ui/button";
import { Eye, Import } from "lucide-react";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  upload: () => void;
  state: "viewUpload" | "viewResults";
}

const Navbar: React.FC<NavbarProps> = ({upload, state}) => {
  const navigator = useNavigate();

  return (
    <div className="w-screen m-0 px-8 py-4 flex justify-center align-middle bg-background border-b-2 border-b-slate-800/5">
      <div className="flex w-full justify-between align-middle">
        <h3 className="leading-none -tracking-wider font-black text-4xl text-primary cursor-pointer" onClick={() => navigator('/')}>
          CarDetection
        </h3>
        { state === 'viewResults' &&
          <Button className="flex gap-2 text-base font-bold text-white" onClick={upload}>
            <Eye className="w-4" />
          View Processed Images
          </Button>
        }
        { state === 'viewUpload' &&
          <Button variant={'outline'} className="flex gap-2 text-base font-bold text-primary border-primary hover:bg-primary/10 hover:text-primary" onClick={() => {navigator("/")}}>
            <Import className="w-4" />
          Import Images
          </Button>
        }
      </div>
    </div>
  )
}

export default Navbar