"use client";

import { useRouter } from "next/navigation";
import { useForm } from "../../../../../hooks/useForm";
import { toast } from "react-toastify";
import NavLink from "../../shared/navigations/NavLink";
import { Logo } from "../../../../../public/icons/iconsExport";
import InputField from "../../shared/input-fields/InputFields";
import Link from "next/link";
import { Button } from "../../shared/buttons/Button";
import { useAppDispatch } from "../../../../../redux/store";
import { userSignIn } from "../../../../../redux/slices/userAuthSlice";
import { useState } from "react";
import { isValidEmail } from "@/helper/utils";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const SignInScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showPword, setShowPword] = useState(false);
  const { formData, errors, validate, handleChange, setErrors } = useForm({
    email: "",
    password: "",
  });
  const requiredFields = Object.keys(formData) as (keyof typeof formData)[];

  const handleSubmit = () => {
    if (!isValidEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
      return;
    }
    if (!validate(requiredFields)) return;

    setLoading(true);
    dispatch(userSignIn(formData))
      .unwrap()
      .then((res) => {
        toast.success("Sign in successful");
        localStorage.setItem("kanma-user", JSON.stringify(res));
        if (res?.user?.role === "buyer") {
          router.push("/");
        } else {
          router.push("/vendor/products");
        }
      })
      .catch((err) => {
        console.log({ err });
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  const pwordvisibility = !showPword ? (
    <IoEyeOutline size={20} onClick={() => setShowPword(true)} />
  ) : (
    <IoEyeOffOutline size={20} onClick={() => setShowPword(false)} />
  );

  return (
    <div>
      <div className="fixed top-0 left-0 flex items-center justify-center h-full w-full p-5 py-10 sm:p-10">
        <div className="w-full max-w-lg px-5 md:px-10 py-10 justify-center border-2 border-black rounded-2xl">
          <div className="flex flex-col justify-center items-center">
            <NavLink href="/" className="mb-5">
              <Logo height={40} width={150} />
            </NavLink>

            <div className="pt-2 text-center text-md ">
              Please enter your details to sign in.
            </div>

            <div className="w-full mt-6">
              <div className="mt-2">
                <InputField
                  label="Email"
                  onChange={handleChange}
                  name="email"
                  error={errors.email}
                />
              </div>
              <div className="mt-2 mb-3">
                <InputField
                  label="Password"
                  type={showPword ? "text" : "password"}
                  onChange={handleChange}
                  endIcon={pwordvisibility}
                  name="password"
                  error={errors.password}
                />
              </div>
              <Link href="#" className="text-xs">
                Forgot password?
              </Link>
            </div>

            <div className="mt-16 w-full flex flex-col items-center">
              <Button
                loading={loading}
                className=" h-[50px] w-full mb-3"
                onClick={handleSubmit}
              >
                Sign in
              </Button>

              <Link href="/sign-up" className="text-center text-sm">
                {" "}
                Don't have an account?{" "}
                <span className="font-semibold text-black">Sign up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
