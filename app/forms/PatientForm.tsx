"use client";

import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { userFormSchema } from "@/lib/validation";
import { FieldTypes } from "@/components/CustomFormField";
import { createUser } from "@/lib/appwrite.config";
import ReusableForm from "@/components/ReusableForm";
import CustomFormField from "../../components/CustomFormField";

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    try {
      setIsLoading(true);

      const userData = {
        name: values.name,
        email: values.email,
        phone: values.phonenumber,
      };

      const newUser = await createUser(userData);
      console.log("done",newUser);

    
        router.push(`patients/trial`);
      
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-8" aria-labelledby="user creation">
        <ReusableForm
              isLoading={isLoading}
              onSubmit={onSubmit}
              defaultValues={{
                name: "",
                email: "",
                phonenumber: "",
              }}
            >
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
