"use client";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import InputField from "../../shared/input-fields/InputFields";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button } from "../../shared/buttons/Button";

interface VerifyProps {
  email: string;
}

const VerifyPage: FC<VerifyProps> = ({ email }) => {
  const [inputNum, setInputNum] = useState(1);
  const [verifyCode, setVerifyCode] = useState([0, 0, 0, 0, 0, 0]);
  const [showWarning, setShowWarning] = useState(false);
  const firstInput = useRef<any>(null);
  const secondInput = useRef<any>(null);
  const thirdInput = useRef<any>(null);
  const fourthInput = useRef<any>(null);
  const fifthInput = useRef<any>(null);
  const sixthInput = useRef<any>(null);
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [ndPasswordVisible, setNdPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  // const mockCode = [9, 9, 6, 2, 8, 1];
  const [loading, setLoading] = useState(false);
  const [resetData, setResetData] = useState({
    newPassword: "",
    newPasswordConfirmation: "",
  });

  console.log(verifyCode);

  const [validInput, setValidInput] = useState({
    newPassword: false,
    newPasswordConfirmation: false,
  });
  useEffect(() => {
    inputNum === 1
      ? firstInput.current.focus()
      : inputNum === 2
      ? secondInput.current.focus()
      : inputNum === 3
      ? thirdInput.current.focus()
      : inputNum === 4
      ? fourthInput.current.focus()
      : inputNum === 5
      ? fifthInput.current.focus()
      : sixthInput.current.focus();
  }, [inputNum]);

  const handleInputChange = (e: any, num: number) => {
    const { name, value } = e.target;
    setResetData({ ...resetData, [name]: value });

    if (name === "newPassword" || name === "newPasswordConfirmation") {
      const isValidPassword = value.length >= 8;
      setValidInput({ ...validInput, [name]: isValidPassword });
    }

    if (num === 1) {
      setPassword(e.target.value);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    // if (!verifyCode.every((num) => num !== 0)) {
    //   setShowWarning(true);
    //   setLoading(false);
    // } else if (!verifyCode.every((num, index) => num == mockCode[index])) {
    //   toast.error("The verification code is incorrect. Please try again.");
    //   setLoading(false);
    // } else {
    if (
      resetData.newPassword.length > 0 &&
      resetData.newPassword === resetData.newPasswordConfirmation
    ) {
      const verificationCode = verifyCode.join("");
      try {
        const response = await axios.post(
          "https://sunet-be-6812.onrender.com/api/users/password",
          { token: verificationCode, newPassword: password }
        );
        console.log(response);
        if (response.status === 200) {
          setShowWarning(false);
          toast.success("Password reset successfully");
          console.log("Password reset successfully");
          router.push("/sign-in");
        } else {
          console.error("Failed:", response.statusText);
          toast.error("Failed!. Please try again later.");
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    } else {
      toast.error("Passwords do not match. Please try again.");
      setLoading(false);
    }
    // }
  };

  const handleResendEmail = async () => {
    try {
      const response = await axios.post(
        "https://sunet-be-6812.onrender.com/api/users/reset",
        { email }
      );

      if (response.status === 200) {
        toast.success("Email resent successfully");
        console.log("Email resent successfully");
      } else {
        console.error("Failed:", response.statusText);
        toast.error("Failed!. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleNdPasswordVisible = () => {
    setNdPasswordVisible(!ndPasswordVisible);
  };

  return (
    <div className="max-w-sm w-full p-2">
      <p className="text-center text-2xl font-semibold text-swGray800">
        Check your Email
      </p>
      <p className="text-center mt-5 mb-8 text-[0.96rem] flex items-center justify-between">
        <span className="text-center">
          Enter the 5 digit code sent to .your email to verify your account
        </span>
      </p>
      <div className="flex gap-3 justify-center">
        <div className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 p-2">
          <input
            type="text"
            className="w-full h-full text-5xl text-center focus:outline-none"
            placeholder="0"
            maxLength={1}
            ref={firstInput}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                console.log();
                setInputNum(2);
                setVerifyCode((prevArray: any) =>
                  prevArray.map((item: any, index: number) =>
                    index === 0 ? e.target.value : item
                  )
                );
              } else {
                setVerifyCode((prevArray) =>
                  prevArray.map((item, index) => (index === 0 ? 0 : item))
                );
                setInputNum(1);
              }
            }}
          />
        </div>
        <div className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 p-2">
          <input
            type="text"
            className="w-full h-full text-5xl text-center focus:outline-none"
            placeholder="0"
            maxLength={1}
            ref={secondInput}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setVerifyCode((prevArray: any) =>
                  prevArray.map((item: any, index: number) =>
                    index === 1 ? e.target.value : item
                  )
                );
                setInputNum(3);
              } else {
                setVerifyCode((prevArray) =>
                  prevArray.map((item, index) => (index === 1 ? 0 : item))
                );
                setInputNum(1);
              }
            }}
          />
        </div>
        <div className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 p-2">
          <input
            type="text"
            className="text-5xl text-center h-full w-full focus:outline-none"
            placeholder="0"
            maxLength={1}
            ref={thirdInput}
            onChange={(e) => {
              // e.target.value.length > 0 ? setInputNum(4) : setInputNum(2)
              if (e.target.value.length > 0) {
                setInputNum(4);
                setVerifyCode((prevArray: any) =>
                  prevArray.map((item: any, index: number) =>
                    index === 2 ? e.target.value : item
                  )
                );
              } else {
                setVerifyCode((prevArray) =>
                  prevArray.map((item, index) => (index === 2 ? 0 : item))
                );
                setInputNum(2);
              }
            }}
          />
        </div>
        <div className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 p-2">
          <input
            type="text"
            className="w-full h-full text-5xl text-center focus:outline-none"
            placeholder="0"
            maxLength={1}
            ref={fourthInput}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setInputNum(5);
                setVerifyCode((prevArray: any) =>
                  prevArray.map((item: any, index: number) =>
                    index === 3 ? e.target.value : item
                  )
                );
              } else {
                setVerifyCode((prevArray) =>
                  prevArray.map((item, index) => (index === 3 ? 0 : item))
                );
                setInputNum(3);
              }
            }}
          />
        </div>
        <div className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 p-2">
          <input
            type="text"
            className="w-full h-full text-5xl text-center focus:outline-none"
            placeholder="0"
            maxLength={1}
            ref={fifthInput}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setInputNum(6);
                setVerifyCode((prevArray: any) =>
                  prevArray.map((item: any, index: number) =>
                    index === 4 ? e.target.value : item
                  )
                );
              } else {
                setVerifyCode((prevArray) =>
                  prevArray.map((item, index) => (index === 4 ? 0 : item))
                );
                setInputNum(4);
              }
            }}
          />
        </div>
        <div className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 p-2">
          <input
            type="text"
            className="w-full h-full text-5xl text-center focus:outline-none"
            placeholder="0"
            maxLength={1}
            ref={sixthInput}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setInputNum(6);
                setVerifyCode((prevArray: any) =>
                  prevArray.map((item: any, index: number) =>
                    index === 5 ? e.target.value : item
                  )
                );
              } else {
                setVerifyCode((prevArray) =>
                  prevArray.map((item, index) => (index === 5 ? 0 : item))
                );
                setInputNum(5);
              }
            }}
          />
        </div>
      </div>
      <div className="flex gap-3 justify-center"></div>
      {showWarning && (
        <p className="text-center text-red-500 mb-8 mt-6">
          Please enter the complete verification code.
        </p>
      )}
      <div className="mt-2">
        <InputField
          label="New Password"
          name="newPassword"
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter New Password"
          onChange={(e: any) => {
            handleInputChange(e, 1);
          }}
          endIcon={
            passwordVisible ? (
              <AiOutlineEyeInvisible
                onClick={handlePasswordVisible}
                className="cursor-pointer mr-2"
                size={20}
              />
            ) : (
              <AiOutlineEye
                onClick={handlePasswordVisible}
                className="cursor-pointer mr-2"
                size={20}
              />
            )
          }
        />
      </div>
      <div className="mt-2">
        <InputField
          label="Confirm New Password"
          name="newPasswordConfirmation"
          type={ndPasswordVisible ? "text" : "password"}
          placeholder="Confirm New Password"
          onChange={(e: any) => {
            handleInputChange(e, 2);
          }}
          endIcon={
            ndPasswordVisible ? (
              <AiOutlineEyeInvisible
                onClick={handleNdPasswordVisible}
                className="cursor-pointer mr-2"
                size={20}
              />
            ) : (
              <AiOutlineEye
                onClick={handleNdPasswordVisible}
                className="cursor-pointer mr-2"
                size={20}
              />
            )
          }
        />
      </div>
      <div className="my-7 flex flex-col gap-3">
        <Button
          // size="large"
          className="block w-full"
          // variant="bluebg"
          // showIcon={false}
          onClick={handleVerify}
        >
          {loading ? "Changing..." : "Change"}
          <div
            className={`${
              loading
                ? "bg-white bg-opacity-50 h-full w-full absolute top-0 left-0 cursor-not-allowed"
                : "hidden"
            }`}
          />
        </Button>
      </div>
      <div className="max-w-sm w-full p-2">
        <p className="text-center mt-5 mb-8 text-[0.95rem] flex justify-center items-center">
          If you did not receive the email within the next 5 minutes, use the
          button below to resend verification email.
        </p>
        <p
          className="text-swPrimary600 font-bold mt-5 mb-8 text-[0.95rem] flex justify-center items-center"
          onClick={handleResendEmail}
        >
          Resend Verification Email
        </p>
      </div>
    </div>
  );
};

export default VerifyPage;
