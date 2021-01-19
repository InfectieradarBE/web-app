import React from 'react';

interface LanguageDropdownProps {
    selectedLanguage: string;
    languages: Array<{ code: string; label: string; }>;
    onLanguageChanged: (code: string) => void;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = (props) => {
    console.log(props.selectedLanguage);
    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="languageMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                {props.languages.find(l => l.code === props.selectedLanguage)?.label}
            </button>
            <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="languageMenu"
            >
                {props.languages.map(l => <li

                    key={l.code}
                    onClick={() => props.onLanguageChanged(l.code)}
                >
                    <button className="dropdown-item">
                        {l.label}
                    </button>

                </li>)}
            </ul>
        </div>
    );
};

export default LanguageDropdown;
