"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const router = useRouter();

  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const goToSurveys = () => router.push('/Surveys');

  return (
    <AppContext.Provider
      value={{
        surveys,
        setSurveys,
        selectedSurvey,
        setSelectedSurvey,
        goToSurveys,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
