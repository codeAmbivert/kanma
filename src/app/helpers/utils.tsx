import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cls = (input: any) =>
  input
    .replace(/\s+/gm, " ")
    .split(" ")
    .filter((cond: any) => typeof cond === "string")
    .join(" ")
    .trim();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormDataSetter = React.Dispatch<React.SetStateAction<any>>;
export const handleInputChange = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.FormEvent<HTMLInputElement>,
  formData: FormDataSetter
) => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  const { name, value } = target;

  formData((prevFormData: any) => ({
    ...prevFormData,
    [name]: value,
  }));
};

export const handleInputChangeWithComma = (
  e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLInputElement>,
  formData: FormDataSetter
) => {
  const target = e.target as HTMLInputElement;
  let { name, value } = target;
  value = value.replace(/,/g, "");
  formData((prevData: any) => ({
    ...prevData,
    [name]: value ? parseFloat(value) : 0,
  }));
};