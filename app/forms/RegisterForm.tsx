"use client";

import CustomFormField, { FieldTypes } from '@/components/CustomFormField';
import ReusableForm from '@/components/ReusableForm';
import { Doctors, Gender, IdentificationTypes } from '@/constants';
import { createUser } from '@/lib/appwrite.config';
import { userFormSchema } from '@/lib/validation';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { z } from 'zod';
import { FormControl } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';

const RegisterForm = () => {
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
      console.log("done", newUser);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='space-y-2 gap-4 flex-1 xl:w-10/12  remove-scrollbar' aria-label='complete registration'>
      <section className="space-y-4">
        <h1 className="header" title='complete registration'>Welcome 👋</h1>
        <p className="text-dark-700">Let us know more about yourself.</p>
      </section>
      <section className="space-y-6 ">
        <div className="mb-9 space-y-1">
          <h2 className="sub-header">Personal Information</h2>
        </div>
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
          <div className="flex flex-col gap-6 py-3 xl:flex-row">
            <CustomFormField 
              name='email'
              label="Email"
              placeholder='johnsmith@gmail.com'
              fieldType={FieldTypes.INPUT}
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormField 
              name='phone'
              label="Phone Number"
              placeholder='xxx xxxx xxx'
              fieldType={FieldTypes.PhoneInput}
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
          </div>
          <div className='flex flex-col gap-6 py-3 xl:flex-row'>
            <CustomFormField
              name="birthdate"
              label="Birth Date"
              placeholder="Select your Birth Date"
              fieldType={FieldTypes.DATE_PICKER}
              iconSrc="/assets/icons/calendar.svg"
              iconAlt="date"
            />
            <CustomFormField
              name="gender"
              label="Gender"
              fieldType={FieldTypes.SKELETON}
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup 
                    className="flex h-11 gap-4 xl:justify-between"
                    onChange={field.onChange}
                    defaultValue={field}
                  >
                    {
                      Gender.map((opt) => (
                        <div className="flex items-center space-x-2" key={opt}>
                          <RadioGroupItem value={opt} id={opt} />
                          <Label htmlFor={opt}>{opt}</Label>
                        </div>
                      ))
                    } 
                  </RadioGroup> 
                </FormControl>
              )}
            />
          </div>
          <div className='flex flex-col gap-6 py-3 xl:flex-row'>
            <CustomFormField
              fieldType={FieldTypes.INPUT}
              name="address"
              label="Address"
              placeholder="5th street"
            />
            <CustomFormField
              fieldType={FieldTypes.INPUT}
              name="occupation"
              label="Occupation"
              placeholder="Electrical Engineer"
            />
          </div>
          
          <div className='flex flex-col gap-6 py-3 xl:flex-row'>
            <CustomFormField
              fieldType={FieldTypes.INPUT}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FieldTypes.PhoneInput}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(xxx) xxx-xxx"
            />
          </div>
          <section className="space-y-6 py-6">
              <div className="mb-9 space-y-1">
                <h2 className="sub-header">Medical Information</h2>
              </div>
              <CustomFormField
                fieldType={FieldTypes.SELECT} 
                name="primaryPhysician"
                label="Primary care physician"
                placeholder="Select a physician"
              >
                {Doctors.map(doc=>(
                  <SelectItem value={doc.name} key={doc.name} >
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={doc.image}
                        width={32}
                        height={32}
                        alt="doctor"
                        className="rounded-full border border-dark-500"
                      />
                      <p>{doc.name}</p>
                  </div>
                  </SelectItem>
                ))}
           </CustomFormField>
           <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FieldTypes.INPUT}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder=" BlueSky"
            />

            <CustomFormField
              fieldType={FieldTypes.INPUT}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="XYZ123456789"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FieldTypes.TEXTAREA}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />

            <CustomFormField
              fieldType={FieldTypes.TEXTAREA}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>
          </section>
          <section className="space-y-6 py-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>
          <CustomFormField
            fieldType={FieldTypes.SELECT}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
           {
            IdentificationTypes.map(id=>(
              <SelectItem  key={id} value={id}>
                {id}
              </SelectItem>
            ))
           }
          </CustomFormField>
          
          </section>
          <section className="space-y-6 py-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Consent and Privacy</h2>
            </div>
            <CustomFormField
            fieldType={FieldTypes.CHECKBOX}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FieldTypes.CHECKBOX}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />
          <CustomFormField
            fieldType={FieldTypes.CHECKBOX}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
            />
          </section>
        </ReusableForm>
      </section>
    </section>
  );
};

export default RegisterForm;
