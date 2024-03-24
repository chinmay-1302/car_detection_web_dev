import { Import, ImportIcon } from "lucide-react"
import { Button } from "./ui/button"
import {useDropzone} from 'react-dropzone'
import { useEffect, useState } from "react";

type UploadTableProps = {
  files: [];
  setFiles: (files: []) => void;
}

const UploadTable: React.FC<UploadTableProps> = ({files, setFiles}) => {
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div key={file.name} className="flex flex-col items-start gap-2 bg-secondary rounded-lg hover:bg-secondary/50">
      <div className="flex p-2 justify-center items-center gap-2">
        <img
          src={file.preview}
          className="w-72 h-40 object-cover rounded-md"
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
      <p className="flex w-72 pb-3 px-2 truncate overflow-hidden">
        {file.name}
      </p>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);
  
  return (
    <div className="w-full h-full flex flex-col gap-0 p-8 bg-white overflow-x-hidden">
    {/* table header */}
    <div className="flex flex-row w-full h-fit p-6 justify-between align-middle border-[1px] border-surface rounded-t-xl">
      <h3 className="text-slate-800 text-2xl font-bold">
        Uploaded Images
      </h3>
    </div>
    {/* table body */}
    { files.length < 1 &&
    <div {...getRootProps({className: 'dropzone'})}>
      <input {...getInputProps()} />
      <div className="flex flex-row w-full flex-1 p-6 justify-center align-middle border-[1px] border-surface rounded-b-xl cursor-pointer"> 
        <div className="flex flex-col items-center justify-center gap-4 py-40">
          <div className="w-32 h-32 border-2 border-slate-800/25 rounded-2xl border-dashed" />
          <div className="w-full flex flex-col gap-2 items-center">
            <p className="text-3xl font-bold text-slate-800">
              No Images
            </p>
            <p className="text-lg text-center text-slate-800/50">
              Drag your images here <br/> or click to upload
            </p>
          </div>
          <div className="flex h-fit items-center justify-center gap-2">
            <Button variant='outline' size='default' className="flex gap-2 border-primary text-primary font-semibold hover:bg-transparent hover:text-primary/60">
              <Import className="w-5" />
              Import Photo
            </Button>
          </div>
        </div>
      </div>
    </div>
    }
    { files.length > 0 &&
    <div className="flex flex-row w-full flex-1 p-6 justify-center align-middle border-[1px] border-surface rounded-b-xl">
      <div className="grid grid-cols-5 gap-4">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <div className="flex flex-col gap-3 items-center justify-center w-[19rem] h-full bg-muted rounded-lg border-[2px] border-primary border-dashed cursor-pointer">
            <ImportIcon className="w-8 h-8 text-primary" />
            <p className="text-lg text-center text-primary font-semibold">
              Upload Images
            </p>
          </div>
        </div>
        {thumbs}
      </div>
    </div>
    }
    </div>
  )
}

export default UploadTable