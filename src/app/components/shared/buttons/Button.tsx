import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/helper/utils";
import { Spinner } from "../../../../../public/icons/iconsExport";

const buttonVariants = cva(
  "inline-flex justify-center items-center gap-3 rounded transition-all duration-500 ease-in-out text-sm",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white border border-black hover:text-black hover:bg-transparent",
        outline:
          "bg-transparent text-black border border-black hover:text-white hover:bg-black",
        black: "bg-black text-white hover:bg-cwPrimaryGreen",
        action: "rounded-full bg-cwPrimaryGreen text-[16px] font-medium",
      },
      size: {
        default: "h-[44px] w-[74px]",
        sm: "h-7 py-2 px-4 rounded-md",
        bigBlack: "h-[56px] w-[179px]",
        action: "h-[48px] w-[183px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = ({
  className,
  size,
  icon,
  variant,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={loading || props.disabled}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <Spinner
          className={`h-[35px] w-[35px] ${
            variant === "default" && "hover:text-white text-cwPrimaryGray1"
          } ${
            variant === "outline" && "hover:text-cwPrimaryGray1 text-white"
          } ${variant === "black" && "hover:text-white text-cwPrimaryGray1"}`}
        />
      ) : (
        <div className="flex gap-2 items-center">
          {icon && icon}
          {props.children}
        </div>
      )}
    </button>
  );
};

export { Button, buttonVariants };
