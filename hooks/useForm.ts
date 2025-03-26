// hooks/useForm.ts
import { validateForm } from "@/app/helpers/validateForm";
import { useState } from "react";

export const useForm = <T extends Record<string, any>>(initialState: T) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = (requiredFields: (keyof T)[]): boolean => {
    const { errors, isValid } = validateForm(formData, requiredFields);
    setErrors(errors);
    return isValid;
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement| HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field
  };

  return { formData, setFormData, errors, validate, handleChange, setErrors };
};
