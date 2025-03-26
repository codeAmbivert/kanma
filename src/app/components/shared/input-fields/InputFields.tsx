interface AuthInputFieldProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  endIcon?: React.ReactElement;
  startIcon?: React.ReactElement;
  borderColor?: string;
}

const InputField = ({
  label,
  name,
  error,
  endIcon,
  startIcon,
  borderColor,
  ...props
}: AuthInputFieldProps) => {
  return (
    <div
      className={`border ${
        borderColor && borderColor
      } hover:border-black p-4 bg-white rounded-md`}
    >
      <label
        htmlFor={name}
        className="block text-[11.52px] md:text-sm font-medium  w-full"
      >
        {label}
        <div className="flex items-center">
          {startIcon && startIcon}
          <input
            id={name}
            name={name}
            type="text"
            {...props}
            className="w-full focus:outline-none text-black text-base"
          />
          {endIcon && endIcon}
        </div>
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
