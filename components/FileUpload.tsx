"use client";

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from "next/image";
import { convertFileToUrl } from '@/lib/utils';

type fileProps={
    files:File[]|undefined,
    OnChange:(files:File[])=>void
}
 const FileUpload=({files,OnChange}:fileProps)=> {
  const onDrop = useCallback((acceptedFiles :File[])=> {
    OnChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}
    className='file-upload'
    >
      <input {...getInputProps()} />
      {files&&files?.length>0?(
        <Image
         src={convertFileToUrl(files[0])}
         alt="uploaded img"
         width={850}
         height={850}
         className="max-h-[400px] overflow-hidden object-cover"
        />
      ):(
        <Image
         src="/assets/icons/upload"
         alt="uplaod icon"
         width={40}
         height={40}
        />
      )}
      <div className='file-upload-label'>
         <p className='text-14-regular'>
           <span className='text-green-500'>
                upload here
           </span> or drag and drop
         </p>
         <p>
          SVG,PNG or GIF 
         </p>
      </div>
    </div>
  )
}
export default FileUpload