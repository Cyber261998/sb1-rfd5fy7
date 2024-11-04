import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'zh', name: '简体中文', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
];

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    document.documentElement.dir = languages.find(lang => lang.code === languageCode)?.dir || 'ltr';
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="ml-4 rounded-md border-gray-300 shadow-sm"
    >
      {languages.map((language) => (
        <option key={language.code} value={language.code}>
          {language.name}
        </option>
      ))}
    </select>
  );
};