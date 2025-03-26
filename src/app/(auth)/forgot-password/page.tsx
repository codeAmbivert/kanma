"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../components/shared/input-fields/InputFields";
import axios from "axios";
import VerifyPage from "../../components/screens/forgot-password/PasswordVerify";
import { Button } from "../../components/shared/buttons/Button";

const ForgotPassword = () => {
  const [pageState, setPageState] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendVerificationCode = async (email: string) => {
    try {
      const response = await axios.post(
        "https://sunet-be-6812.onrender.com/api/users/reset",
        { email }
      );

      if (response.status === 200) {
        toast.success("Email sent successfully");
        setPageState(1);
      } else {
        console.error("Failed:", response.statusText);
     
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (isValidEmail(formData.email)) {
      setLoading(true);
      try {
        await sendVerificationCode(formData.email);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setEmailError("Please enter a valid email address");
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="flex justify-center min-h-screen pt-20">
        {pageState === 0 && (
          <div className="max-w-sm w-full p-2 mt-20">
            <p className="text-center text-2xl font-medium text-jsPrimary100">
              Forgot your password
            </p>
            <p className="text-center mt-2 mb-8 text-[0.95rem]">
              Let’s help you reset your password. Provide your email address,
              We’ll send a reset link.
            </p>

            <div className="w-full">
              <InputField
                label={"Email"}
                name={"email"}
                placeholder={"Enter email address"}
                onChange={handleInputChange}
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>

            <div className="my-7 flex justify-center">
              <Button
                // size="large"
                className="block w-full"
                // variant="bluebg"
                // showIcon={false}
                onClick={handleForgotPassword}
              >
                {loading ? "Sending..." : "Send mail"}
                <div
                  className={`${
                    loading
                      ? "bg-white bg-opacity-50 h-full w-full absolute top-0 left-0 cursor-not-allowed"
                      : "hidden"
                  }`}
                />
              </Button>
            </div>
          </div>
        )}
        {pageState === 1 && <VerifyPage email={formData.email} />}
      </main>
    </>
  );
};

export default ForgotPassword;
