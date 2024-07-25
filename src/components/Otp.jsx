// Otp.js
import Page from "./Page";
import Button from "./Button";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useCallback, useRef, useEffect, useState } from "react";

function Otp() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
    reset
  } = useForm();
  const inputRefs = useRef([]);
  // const OTP = useRef('');
  const [submitted, setSubmitted] = useState(false);
  const [OTP, setOTP] = useState(null);
  const [OTPVerification, setOTPVerification] = useState(false);
  const [showOTP, setShowOTP] = useState(true);

  const submitOTP = (data) => {
    setSubmitted(true)
    const enteredOTP = `${data[1]}${data[2]}${data[3]}${data[4]}`
    if (enteredOTP != OTP) {
      setOTPVerification(false);
      [1, 2, 3, 4].map((index) => (
        setError(`${index}`)
      ))
    } else {
      setOTPVerification(true);
    }
  };

  const generateOTP = useCallback(() => {
    let otp = ''
    let str = '0123456789'

    for (let index = 1; index <= 4; index++) {
      let char = Math.floor(Math.random() * str.length)
      otp += str.charAt(char)
    }
    // debugger
    setOTP(otp)
    setShowOTP(true)
  }, [])

  const resendOTP = useCallback(() => {
    reset();
    inputRefs.current.forEach(ref => {
      if (ref) {
        ref.value = '';
      }
    });
    setSubmitted(false)
    generateOTP();
  }, [reset, generateOTP])

  const handleChange = (event, index) => {
    const value = event.target.value;
    if (/^\d$/.test(value)) {
      setValue(`${index}`, value);
      if (index < 4) {
        inputRefs.current[index].focus();
      }
    } else {
      event.target.value = ''
      setValue(`${index}`, '')
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && !watch(`${index}`)) {
      if (index > 1) {
        inputRefs.current[index - 2].focus();
      }
    }
  };


  useEffect(() => {
    generateOTP();
  }, [generateOTP]);

  useEffect(() => {
    if (showOTP) {
      setTimeout(() => {
        setShowOTP(false)
      }, 5000);
    }
  }, [showOTP])
  

  return (
    <div className="w-full lg:w-4/12 md:w-6/12 mx-2 p-8 rounded-md bg-white flex flex-col items-center justify-center">
      {showOTP && <div className="absolute top-16 right-12 bg-teal-200 p-4 rounded-lg">
        Your OTP is : {OTP}
      </div>}
      <h1 className="font-bold text-xl font-DmSans py-1">
        Mobile Phone Verification
      </h1>
      <p className="text-xs opacity-50 py-2">
        Enter the 4-digit verification code that was sent to your phone
      </p>
      {/* <input className="p-4 rounded-lg w-14 bg-customInputBg" /> */}
      <form
        onSubmit={handleSubmit(submitOTP)}
        className="w-full flex flex-col justify-center items-center"
      >
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((index) => (
            <Input
              key={index}
              type="text"
              maxLength="1"
              className={`w-14 text-xl font-sans text-center border ${
                errors[index] ? " border-danger" : "" 
              } ${submitted ? OTPVerification ? 'border-success' : 'border-danger' : ''}`}
              {...register(`${index}`, {
                required: true,
                maxLength: 1,
                pattern: /^\d$/,
              })}
              onChange={(event) => handleChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(el) => (inputRefs.current[index - 1] = el)}
            />
          ))}
        </div>
        <Button type="submit" className={`m-2 ${submitted ? OTPVerification ? 'bg-success' : 'bg-danger' : ''}`}>
          {submitted ? OTPVerification ? 'Verified' : 'Verification Failed' : 'Verify Account'}
        </Button>
      </form>
      <span className="flex text-xs">
        <p className="opacity-50">Didn&apos;t receive code? </p> <span className="cursor-pointer" onClick={resendOTP}>Resend</span>
      </span>
    </div>
  );
}

const OtpComponent = Page(Otp, "bg-customBack");

export default OtpComponent;
