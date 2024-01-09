"use client";
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const TaskButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    type="submit"
    onClick={onClick}
    className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-rose-600 px-4 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
  >
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const HomePage = () => {
  const router = useRouter();
  return (
    <section className="bg-gray-50 justify-items-center flex justify-center items-center min-h-screen overflow-hidden dark:bg-gray-900">
      <div className="grid lg:grid-cols-2 container">
        <div className="lg:hidden">
          <Image src={"/banner.png"} width={900} height={200} alt="loading.." />
        </div>
        <div className="p-8 md:p-12 lg:px-16 lg:py-24 max-w-lg text-center">
          <h2 className="text-2xl font-bold text-start text-gray-900 dark:text-white">
            <span className="mb-3">Hello!</span> <br />
            <span className="text-4xl   md:text-nowrap">
              👋 I'm Ibrahim Ahmed Siddiqui,
            </span>
          </h2>

          <p className=" mt-8 text-justify text-gray-500 dark:text-gray-400 sm:mt-4 sm:block">
            ✨ Hello World! 👨‍💻 I'm Ibrahim Ahmed Siddiqui, a Developer on a
            mission to turn lines of code into art. 🎨 🚀 Crafting solutions
            with passion and precision. ML & AI enthusiast 🤖, AWS explorer ☁️,
            and a perpetual learner 📚. Let's build the future together! 🌐✨
          </p>

          <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 mt-8 max-w-xl">
            <TaskButton
              onClick={() => router.push("/Task-1")}
              label={`Task1`}
            />
            <TaskButton
              onClick={() => router.push("/Task-2")}
              label={`Task2`}
            />
            <TaskButton
              onClick={() => router.push("/Task-3")}
              label={`Task3`}
            />
            <TaskButton
              onClick={() => router.push("/Task-4")}
              label={`Task4`}
            />
          </div>
        </div>
        <div className="hidden lg:block">
          <Image src={"/banner.png"} width={900} height={200} alt="loading.." />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
