import React from 'react';

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const languages = ['javascript', 'python', 'java', 'html', 'css']; // Add more languages as needed

  return (
    <div>
      <label htmlFor="languageSelect">Select a language:</label>
      <select
        id="languageSelect"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
