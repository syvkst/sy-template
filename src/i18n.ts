import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export const defaultNS = "strings";
export const resources = {
  fi: {
    strings: {
      Valitse: "Valitse",
      "Etsi...": "Etsi...",
      "Ei tuloksia": "Ei tuloksia",
      minQueryLength:
        "Etsintään vaaditaan vähintään <1>{{minQueryLength}}</1> merkkiä",
      Suodata: "Suodata",
      "Kirjoita...": "Kirjoita...",
      "Poista valitut": "Poista valitut",
      "Tätä toimintoa ei voi peruuttaa. Valitut kohteet poistetaan pysyvästi. Haluatko varmasti jatkaa?":
        "Tätä toimintoa ei voi peruuttaa. Valitut kohteet poistetaan pysyvästi. Haluatko varmasti jatkaa?",
      Peruuta: "Peruuta",
      Jatka: "Jatka",
      Edellinen: "Edellinen",
      Seuraava: "Seuraava",
      Teema: "Teema",
      Vaalea: "Vaalea",
      Tumma: "Tumma",
      Järjestelmä: "Järjestelmä",
    },
  },
  sv: {
    strings: {
      Valitse: "Välja",
      "Etsi...": "Sök...",
      "Ei tuloksia": "Inga resultat",
      minQueryLength:
        "Minst <1>{{minQueryLength}}</1> tecken krävs för en sökning",
      Suodata: "Filtrera",
      "Kirjoita...": "Skriv...",
      "Poista valitut": "Ta bort valda",
      "Tätä toimintoa ei voi peruuttaa. Valitut kohteet poistetaan pysyvästi. Haluatko varmasti jatkaa?":
        "Denna funktion kan inte ångras. De valda uppgifterna raderas för gott. Vill du säkert fortsätta?",
      Peruuta: "Ångra",
      Jatka: "Fortsätt",
      Edellinen: "Tidigare",
      Seuraava: "Senare",
      Teema: "Tema",
      Vaalea: "Ljus",
      Tumma: "Mörk",
      Järjestelmä: "Tema enligt allmän standard",
    },
  },
} as const;

i18next.use(initReactI18next).init({
  debug: true,
  lng: localStorage.getItem("sy-ui-lang") === "sv" ? "sv" : "fi",
  fallbackLng: "fi",
  defaultNS,
  ns: ["strings"],
  resources: resources,
});

export default i18next;
