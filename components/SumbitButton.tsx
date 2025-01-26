import React from 'react'
import { Button } from './ui/button'
import Image from "next/image";

interface SumbitButtonProps{
    children:React.ReactNode
    classname?:string
    isLoading:boolean
}
const SumbitButton = ({children,classname,isLoading}:SumbitButtonProps) => {
  return (
    <Button
        type="submit"
        disabled={isLoading}
        className={classname ?? "shad-primary-btn w-full my-6"}
    >
        {
            isLoading?(
                <div className="flex items-center gap-4">
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
                Loading...
              </div>
            )
            :
             children}
    </Button>
  )
}

export default SumbitButton