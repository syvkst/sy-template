import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import components from "@/loc/components.json";
import strings from "@/loc/strings.json";

export const defaultNS = "strings";
export const resources = {
  fi: {
    components: components.fi,
    strings: strings.fi,
  },
  sv: {
    components: components.sv,
    strings: strings.sv,
  },
} as const;

i18next.use(initReactI18next).init({
  debug: true,
  lng: localStorage.getItem("sy-ui-lang") === "sv" ? "sv" : "fi",
  fallbackLng: "fi",
  defaultNS,
  ns: ["strings", "components"],
  resources: resources,
});

export default i18next;
