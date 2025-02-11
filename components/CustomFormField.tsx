"use client";

import Image from "next/image";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldValues } from "react-hook-form";
import PhoneInput from 'react-phone-number-input';
import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { useTheme } from "next-themes"; 

export const enum FieldTypes {
  INPUT = "input",
  PhoneInput = "phoneinput",
  TEXTAREA = "textarea",
  SELECT = "select",
  DATE_PICKER = "datepicker",
  SKELETON = "skeleton",
  CHECKBOX = "checkbox"
}

export interface CustomFieldProps {
  name: string;
  control: Control<FieldValues>;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FieldTypes;
}

const RenderInput = ({ field, props }: { field: any; props: CustomFieldProps }) => {
  const { theme } = useTheme(); 
  const inputClass = `border rounded-md flex ${
    theme === "dark" ? "bg-dark-400 border-dark-500 text-white" : "bg-gray-100 border-gray-300 text-black"
  }`;

  switch (props.fieldType) {
    case FieldTypes.INPUT:
      return (
        <div className={inputClass}>
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className={`shad-input border-0 ${
                theme === "dark" ? "bg-dark-400 border-dark-500 text-white" : "bg-gray-100 border-gray-300 text-black"
              }`}
            />
          </FormControl>
        </div>
      );
    case FieldTypes.TEXTAREA:
      return <Textarea placeholder={props.placeholder} {...field} className={inputClass} />;
    case FieldTypes.CHECKBOX:
      return (
        <div className="flex items-center space-x-2">
          <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
          <label
            htmlFor={props.name}
            className={`text-sm font-medium leading-none ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            {props.label}
          </label>
        </div>
      );
    case FieldTypes.PhoneInput:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value || ""}
            onChange={(value) => field.onChange(value as E164Number | undefined)}
            className={`input-phone ${inputClass}`}
          />
        </FormControl>
      );
    case FieldTypes.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    case FieldTypes.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className={`shadow-lg ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            {props.children}
          </SelectContent>
        </Select>
      );
    case FieldTypes.DATE_PICKER:
      return (
        <div className={inputClass}>
          <Image src="/assets/icons/calendar.svg" height={24} width={24} alt="calendar" className="ml-2" />
          <ReactDatePicker
            selected={field.value}
            onChange={(date: Date | null) => field.onChange(date)}
            showTimeSelect={props.showTimeSelect ?? false}
            dateFormat={props.dateFormat ?? "dd/MM/yyyy"}
            timeInputLabel="Time:"
            wrapperClassName="date-picker"
            className="w-full bg-transparent border-none focus:ring-0"
          />
        </div>
      );
    default:
      return null;
  }
};

const CustomFormField = (props: CustomFieldProps) => {
  const { name, label, control } = props;
  return (
    <FormField control={control} name={name} render={({ field }) => (
      <FormItem>
        {props.fieldType !== FieldTypes.CHECKBOX && label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <RenderInput field={field} props={props} />
        </FormControl>
        <FormMessage className="shad-error" />
      </FormItem>
    )} />
  );
};

export default CustomFormField;
