"use client";
import { DataContext, DataContextValue } from "@/provider/data-provider";
import { useContext } from "react";

const useData = () => {
  const obj = useContext<DataContextValue<IResponse>>(DataContext);
  return obj;
};

export default useData;
