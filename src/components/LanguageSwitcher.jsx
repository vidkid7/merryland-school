import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div className="language-dropdown-container">
            <FiGlobe className="lang-icon" />
            <select
                value={i18n.language}
                onChange={changeLanguage}
                className="language-select"
                aria-label="Select Language"
            >
                <option value="en">English</option>
                <option value="ne">नेपाली</option>
            </select>
            <FiChevronDown className="arrow-icon" />
        </div>
    );
};

export default LanguageSwitcher;
