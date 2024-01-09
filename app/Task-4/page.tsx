"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SendMail } from "@/action/action";

interface FormState {
  username: string;
  password: string;
}

const initialFormState: FormState = {
  username: "",
  password: "",
};

const UserForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormState>(initialFormState);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(String(password));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate form
    let formErrors = initialFormState;

    if (!validateEmail(formState.username)) {
      formErrors = { ...formErrors, username: "Invalid email format" };
    }

    if (!validatePassword(formState.password)) {
      formErrors = {
        ...formErrors,
        password:
          "Password must contain an uppercase letter, a number, and no special character other than @",
      };
    }

    setErrors(formErrors);

    if (formErrors.username === "" && formErrors.password === "") {
      // Check password for redirection
      if (formState.password === "SmartServTest@123") {
        // Redirect to dashboard
        router.push("/Task-4/dashboard");
      } else {
        // Display error for incorrect password
        setErrors({
          ...formErrors,
          password: "Incorrect password. Please try again.",
        });
      }
    }
  };

  const handleForget = async () => {
    await SendMail();
  };
  return (
    <div className="bg-[#222222] px-4 h-screen min-h-screen  flex justify-center items-center ">
      <div className="rounded-md bg-[#131313] p-4 md:w-1/2 lg:w-1/3 relative overflow-hidden ">
        <div className="mb-10 flex justify-center">
          <Image src="/logo.png" width={400} height={200} alt="loading" />
        </div>
        <form onSubmit={handleSubmit} className="flex gap-4  flex-col">
          <div>
            <label
              htmlFor="username"
              className="block text-xl text-neutral-200 font-medium"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleInputChange}
              className="mt-1 w-full h-10 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            {errors.username && (
              <p className="text-rose-500 text-xs mb-3 mt-1">
                {errors.username}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xl text-neutral-200 font-medium">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
              className="mt-1 w-full h-10 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            {errors.password && (
              <p className="text-rose-500 text-xs mb-3 mt-1">
                {errors.password}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              type="submit"
              className="inline-block shrink-0 rounded-md border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white transition w-full hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500"
            >
              Submit
            </button>
          </div>
          <button
            onClick={handleForget}
            className="w-full text-neutral-500 font-medium text-center mt-4"
          >
            Forget Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
