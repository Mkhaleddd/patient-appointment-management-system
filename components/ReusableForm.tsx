"use client"

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SumbitButton from "./SumbitButton";

interface ReusableFormProps<T extends z.ZodType<any, any>> {
  children: React.ReactNode;
  defaultValues?: Partial<z.infer<T>>;
  btnLabel?: string;
  isLoading: boolean;
  onSubmit: SubmitHandler<z.infer<T>>;
  validation: T;
}

const ReusableForm = <T extends z.ZodType<any, any>>({
  children,
  defaultValues = {},
  onSubmit,
  isLoading,
  validation,
  btnLabel = "Submit"
}: ReusableFormProps<T>) => {
  const form = useForm<z.infer<T>>({
    //@ts-ignore
    defaultValues,
    resolver: zodResolver(validation),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {children && (
          React.Children.map(children, (child) =>
            child ? React.cloneElement(child as React.ReactElement<any>, { control: form.control }) : null
          )
        )}

        <SumbitButton isLoading={isLoading}>
          {btnLabel}
        </SumbitButton>
      </form>
    </Form>
  );
};

export default ReusableForm;