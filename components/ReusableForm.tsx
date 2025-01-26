"use client"

import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import {Form} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import SumbitButton from "./SumbitButton"
import { userFormSchema } from "@/lib/validation"

interface ReusableFormProps {
  children: React.ReactNode
  defaultValues?: {
    name: string
    email: string
    phonenumber: string
    }
  
  isLoading:boolean
  onSubmit: SubmitHandler<z.infer<typeof userFormSchema>>
}

const ReusableForm=({children,defaultValues,onSubmit,isLoading}: ReusableFormProps)=>{

    let form = useForm<z.infer<typeof userFormSchema>>({
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      phonenumber: defaultValues?.phonenumber || ""
    },
    resolver: zodResolver(userFormSchema), 
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>  
      {React.Children.map(children, (child) => {
      
        return React.cloneElement(child as React.ReactElement<any>, {
         control: form.control, 
        });
      })}
        <SumbitButton isLoading={isLoading}>Submit</SumbitButton>
      </form>
    </Form>
  )
}
export default  ReusableForm
