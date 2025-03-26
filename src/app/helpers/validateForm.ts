export interface ValidationErrors {
  [key: string]: string;
}

/**
 * Validates form data against required fields.
 * @param formData - The form data object to validate.
 * @param requiredFields - List of fields that are required.
 * @returns An object containing errors and a boolean `isValid`.
 */
export const validateForm = <T extends Record<string, any>>(
  formData: T,
  requiredFields: (keyof T)[]
): { errors: Partial<Record<keyof T, string>>; isValid: boolean } => {
  const errors: Partial<Record<keyof T, string>> = {};
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!formData[field]) {
      errors[field] = "This field is required";
      isValid = false;
    }
  });

  return { errors, isValid };
};
