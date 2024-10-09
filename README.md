# SY Template

This template provides a setup for SY projects in Vite with React, Typescript, TailwindCSS and customised components.

## Installation

Clone the repository:

```sh
git clone https://github.com/syvkst/sy-template.git
```

Open the directory and edit `App.tsx`.

## Theme and language

This template contains components for changing the theme and language of the application. Supported languages are Finnish and Swedish. Localization is based on [i18next](https://www.i18next.com/).

Internal components use `src/loc/components.json` for translations (i18next namespace `components`). The default translation namespace is `strings`, so you may add your own translations to `src/loc/strings.json` and immediately start utilising them without any namespace prefix. For usage in components, refer to react-i18next [useTranslation](https://react.i18next.com/latest/usetranslation-hook) hook documentation.

Theme mode and language toggles are simple button-based components without props:

```tsx
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";

<ModeToggle />
<LanguageToggle />
```

You may get and (and also set) the user's language choice with the `useLanguage` hook:

```tsx
import { useLanguage } from "@/hooks/useLanguage";

export function MyComponent() {
  const [language, setLanguage] = useLanguage();

  if (language === "sv") {
    return "Hej!";
  } else {
    return "Terve!";
  }
}
```

The `useLanguage` hook will return either `"fi"` or `"sv"`. If `setLanguage` is used with any other string, the language will be set to `fi`.

## Fonts and colors

Default font for all elements is `Fira Sans` and `Dosis` for headings. Both font files are included as assets. Other included fonts are:

- `Miniver`
- `Teko`; and
- `Silkscreen`

Corresponding Tailwind classes of `-firasans`, `-dosis`, `-miniver`, `-teko` and `-silkscreen` may be utilised for these fonts. For example:

```tsx
<span className="font-teko">Terve maailma!</span>
```
