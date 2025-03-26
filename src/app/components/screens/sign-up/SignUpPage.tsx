"use client";

import { useRouter } from "next/navigation";
import { useForm } from "../../../../../hooks/useForm";
import { toast} from "react-toastify";
import NavLink from "../../shared/navigations/NavLink";
import { Logo } from "../../../../../public/icons/iconsExport";
import InputField from "../../shared/input-fields/InputFields";
import { Button } from "../../shared/buttons/Button";
import ReusableDropDown from "../../shared/input-fields/ReusableDropDown";
import { isValidEmail } from "@/helper/utils";
import { useAppDispatch } from "../../../../../redux/store";
import { userSignUp } from "../../../../../redux/slices/userAuthSlice";
import { useState } from "react";
import Link from "next/link";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const SignUpScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showPword, setShowPword] = useState(false);
  const { formData, errors, validate, handleChange, setErrors, setFormData } =
    useForm({
      firstName: "",
      lastName: "",
      email: "",
      role: "buyer",
      password: "",
      confirm_password: "",
    });
  const requiredFields = Object.keys(formData) as (keyof typeof formData)[];

  const user_options = [
    { label: "Buyer", value: "buyer" },
    { label: "Seller", value: "seller" },
  ];

  const handleSubmit = () => {
    if (formData.password !== formData.confirm_password) {
      setErrors({
        ...errors,
        confirm_password: "Passwords do not match",
      });
      return;
    }
    if (!isValidEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
      return;
    }
    if (!validate(requiredFields)) return;

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    setLoading(true);
    dispatch(userSignUp(payload))
      .unwrap()
      .then((res) => {
        toast.success("Account created successfully, Login to continue");
        router.push("/sign-in");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const pwordvisibility = !showPword ? (
    <IoEyeOutline size={20} onClick={() => setShowPword(true)} />
  ) : (
    <IoEyeOffOutline size={20} onClick={() => setShowPword(false)} />
  );

  return (
    <div className="py-10">
      <div className="flex items-center justify-center h-screen py-10 px-5 sm:p-10">
        <div className="w-full max-w-lg px-5 md:px-10 py-10 justify-center border-2 border-black rounded-2xl">
          <div className="flex flex-col justify-center items-center">
            <NavLink href="/" className="mb-5">
              <Logo height={40} width={150} />
            </NavLink>

            <div className="pt-2 text-nrvLightGrey text-md text-center">
              Please enter your details to create your account.
            </div>

            <div className="w-full mt-6">
              <div className="mt-2">
                <InputField
                  label="First Name"
                  onChange={handleChange}
                  name="firstName"
                  error={errors.firstName}
                />
              </div>
              <div className="mt-2">
                <InputField
                  label="Last Name"
                  onChange={handleChange}
                  name="lastName"
                  error={errors.lastName}
                />
              </div>
              <div className="mt-2">
                <InputField
                  label="Email"
                  onChange={handleChange}
                  name="email"
                  error={errors.email}
                />
              </div>
              <div className="mt-2">
                <ReusableDropDown
                  value={user_options.find(
                    (option) => option.value === formData.role
                  )}
                  options={user_options}
                  onChange={(val) =>
                    setFormData({ ...formData, role: val.value })
                  }
                />
              </div>

              <div className="mt-2">
                <InputField
                  label="Password"
                  type={showPword ? "text" : "password"}
                  onChange={handleChange}
                  endIcon={pwordvisibility}
                  name="password"
                  error={errors.password}
                />
              </div>
              <div className="mt-2">
                <InputField
                  label="Confirm password"
                  type={showPword ? "text" : "password"}
                  onChange={handleChange}
                  endIcon={pwordvisibility}
                  name="confirm_password"
                  error={errors.confirm_password}
                />
              </div>
            </div>

            <div className="mt-16 w-full flex flex-col items-center">
              <Button
                loading={loading}
                className=" h-[50px] w-full mb-3"
                onClick={handleSubmit}
              >
                Sign up
              </Button>

              <Link href="/sign-in" className="text-center text-sm">
                {" "}
                Already have an account?{" "}
                <span className="font-semibold text-black">Sign in</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
