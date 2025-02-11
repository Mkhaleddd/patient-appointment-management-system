"use client";

import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldTypes } from "@/components/CustomFormField";
import { createUser } from "@/lib/appwrite.config";
import ReusableForm from "@/components/ReusableForm";
import CustomFormField from "../CustomFormField";
import { userFormSchema } from "@/lib/validation";

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  
  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    setIsLoading(true)
    try {
      const user = {
        name: values.name,
        email: values.email,
        phonenumber: values.phonenumber,
      };

     const newUser = await createUser(user);
    // if(newUser) router.push(`/patients/${newUser.$id}/register`);
    router.push("patients/register")
    }  
    catch (err) {
      console.log(err);
    } 
     finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-8" aria-labelledby="user creation">
        <ReusableForm
        isLoading={isLoading}
        onSubmit={onSubmit}
        validation={userFormSchema}
        defaultValues={{
          name: "",
          email: "",
          phonenumber: "",
        }}   btnLabel={"Submit"}            >
              <h1 className="header">Hi there 👋</h1>
              <p className="text-dark-700 mb-5">Get started with appointments.</p>
              <CustomFormField
                name="name"
                label="Full Name"
                placeholder="John Smith"
                fieldType={FieldTypes.INPUT}
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
              />
              <CustomFormField
                name="email"
                label="Email"
                placeholder="johnsmith@gmail.com"
                fieldType={FieldTypes.INPUT}
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
              />
              <CustomFormField
                name="phonenumber"
                label="Phone number"
                placeholder="(555) 123-456"
                fieldType={FieldTypes.PhoneInput}
              />
            </ReusableForm>
    </section>
    
  );
};

export default PatientForm;
