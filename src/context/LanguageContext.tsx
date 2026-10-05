"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/data/translations";
import { personalInfo as personalInfoId, projectsData as projectsDataId, skillCategoriesData as skillCategoriesDataId, experienceData as experienceDataId, educationData as educationDataId, certificationData as certificationDataId } from "@/data/portfolioData";
import { personalInfoEn, projectsDataEn, skillCategoriesDataEn, experienceDataEn, educationDataEn, certificationDataEn } from "@/data/portfolioDataEn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.id;
  personalInfo: typeof personalInfoId;
  projectsData: typeof projectsDataId;
  skillCategoriesData: typeof skillCategoriesDataId;
  experienceData: typeof experienceDataId;
  educationData: typeof educationDataId;
  certificationData: typeof certificationDataId;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred_language") as Language;
    if (savedLang === "id" || savedLang === "en") {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_language", lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === "id" ? "en" : "id";
    setLanguage(nextLang);
  };

  const isEn = language === "en";

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
    personalInfo: isEn ? personalInfoEn : personalInfoId,
    projectsData: isEn ? projectsDataEn : projectsDataId,
    skillCategoriesData: isEn ? skillCategoriesDataEn : skillCategoriesDataId,
    experienceData: isEn ? experienceDataEn : experienceDataId,
    educationData: isEn ? educationDataEn : educationDataId,
    certificationData: isEn ? certificationDataEn : certificationDataId,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
