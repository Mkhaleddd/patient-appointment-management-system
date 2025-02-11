"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { FieldTypes } from "@/components/CustomFormField";
import ReusableForm from "@/components/ReusableForm";
import CustomFormField from "../CustomFormField";
import {
    createAppointment,
    updateAppointment,
  } from "@/lib/actions/appointment.actions";
  import { getAppointmentSchema } from "@/lib/validation";
  import { Appointment } from "@/types/appwrite.type";
  
  import "react-datepicker/dist/react-datepicker.css";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { Doctors } from "@/constants";
import { Dispatch, SetStateAction, useState } from "react";

const AppointmentForm = ({
    userId,
    patientId,
    type = "create",
    appointment,
    setOpen,
}: {
    userId?: string;
    patientId?: string;
    type: "create" | "schedule" | "cancel";
    appointment?: Appointment;
    setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const schemaType = getAppointmentSchema(type);

    const onSubmit = async (values: z.infer<typeof schemaType>) => {
        setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }(true);


        try {
            if (type === "create" && patientId) {
                const appointment = {
                  userId,
                  patient: patientId,
                  primaryPhysician: values.primaryPhysician,
                  schedule: new Date(values.schedule),
                  reason: values.reason!,
                  status: status as Status,
                  note: values.note,
                };
        
                const newAppointment = await createAppointment(appointment);
        
                if (newAppointment) {
                  router.push(
                   //`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
                    "/patients/success"
                ); }
                } else {
                  const appointmentToUpdate = {
                    userId,
                    appointmentId: appointment?.$id!,
                    appointment: {
                      primaryPhysician: values.primaryPhysician,
                      schedule: new Date(values.schedule),
                      status: status as Status,
                      cancellationReason: values.cancellationReason,
                    },
                    type,
                  };
          
                  const updatedAppointment = await updateAppointment(appointmentToUpdate);
          
                  if (updatedAppointment) {
                    setOpen && setOpen(false);
                  }
                }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const labelMap = {
        create: "Create An Appointment",
        schedule: "Schedule an Appointment",
        cancel: "Cancel Appointment",
    };

    return (
        <section className="space-y-8" aria-labelledby="user-creation">
            <ReusableForm
                isLoading={isLoading}
                onSubmit={onSubmit}
                validation={schemaType}
                defaultValues={{
                    primaryPhysician: appointment ? appointment?.primaryPhysician : "",
                    schedule: appointment
                      ? new Date(appointment?.schedule!)
                      : new Date(Date.now()),
                    reason: appointment ? appointment.reason : "",
                    note: appointment?.note || "",
                    cancellationReason: appointment?.cancellationReason || "",
                }}
                btnLabel={labelMap[type]}
            >
                <h1 className="header mb-4">Welcome to your appointment</h1>

                {type !== "cancel" && (
                    <>
                        <div className="flex flex-col gap-6">
                           
                            <CustomFormField
                                fieldType={FieldTypes.SELECT}
                                name="primaryPhysician"
                                label="Doctor"
                                placeholder="Select a Doctor"
                            >
                                {Doctors.map((doc) => (
                                    <SelectItem value={doc.name} key={doc.name}>
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

                   
                            <CustomFormField
                                fieldType={FieldTypes.DATE_PICKER}
                                name="schedule"
                                label="Expected Appointment Date"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeSelect
                            />
                        </div>

                        <div className="flex flex-col gap-6 p-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FieldTypes.TEXTAREA}
                                name="reason"
                                label="Appointment Reason"
                                placeholder="Enter the reason for the appointment"
                            />

                            <CustomFormField
                                fieldType={FieldTypes.TEXTAREA}
                                name="note"
                                label="Notes"
                                placeholder="Enter Notes Here"
                            />
                        </div>
                    </>
                )}

                {type === "cancel" && (
                    <CustomFormField
                        fieldType={FieldTypes.TEXTAREA}
                        name="cancellationReason"
                        label="Reason for Cancellation"
                        placeholder="Enter reason for cancellation"
                    />
                )}
            </ReusableForm>
        </section>
    );
};

export default AppointmentForm;
