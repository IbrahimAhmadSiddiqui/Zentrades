"use client";
import React, { createContext, FC, useReducer, useEffect } from "react";
import { fetchApiData } from "@/action/action";

export interface DataContextValue<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
}

interface DataAction<T> {
  type: "FETCH_SUCCESS" | "FETCH_ERROR";
  payload?: T;
  error?: string;
}

const initialState: DataContextValue<any> = {
  loading: false,
  data: null,
  error: null,
};

const dataReducer = <T,>(
  state: DataContextValue<T>,
  action: DataAction<T>
): DataContextValue<T> => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload || null,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error || "Error fetching data",
      };
    default:
      return state;
  }
};

const DataContext = createContext<DataContextValue<any>>(initialState);

interface IDataProviderProps {
  children: React.ReactNode;
}

const DataProvider: FC<IDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        const responseData = await fetchApiData<IResponse>();
        dispatch({ type: "FETCH_SUCCESS", payload: responseData });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", error: (error as Error).message });
      }
    };

    fetchDataWrapper();
  }, []);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };
