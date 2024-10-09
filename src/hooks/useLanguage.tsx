import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const langKey = "sy-ui-lang";

export const useLanguage = () => {
  const [language, setLanguage] = useState<"fi" | "sv">(() => {
    const stored = localStorage.getItem(langKey);
    return stored == "sv" ? stored : "fi";
  });

  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.resolvedLanguage !== language) {
      i18n.changeLanguage(language);
    }

    if (language !== localStorage.getItem(langKey)) {
      localStorage.setItem(langKey, language);
    }
  }, [language]);

  return [language, setLanguage] as const;
};
