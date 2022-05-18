import React from "react";
import styles from "./index.module.css";
import ArrowDown from "@site/static/img/samples/arrowDown.svg";
import ArrowUp from "@site/static/img/samples/arrowUp.svg";

const languageOptions = ["Motoko", "Rust", "Javascript"];
const domainOptions = [
  "Global",
  "Gaming",
  "DeFi",
  "Basic",
  "Website",
  "NFT",
  "IoT",
];
const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const contentTypeOptions = ["Code Samples", "Videos", "Documentation"];

function Index({
  numberOfItems,
  selectedLanguages,
  setSelectedLanguages,
  selectedDomains,
  setSelectedDomains,
  selectedLevels,
  setSelectedLevels,
  selectedContentTypes,
  setSelectedContentTypes,
}) {
  const [isSelectingLanguage, setIsSelectingLanguage] = React.useState(false);
  const [isSelectingDomain, setIsSelectingDomain] = React.useState(false);
  const [isSelectingLevel, setIsSelectingLevel] = React.useState(false);
  const [isSelectingContentType, setIsSelectingContentType] =
    React.useState(false);

  const updateCurrentSelection = (selection) => {
    if (selection === "language") {
      setIsSelectingLanguage(!isSelectingLanguage);
      setIsSelectingDomain(false);
      setIsSelectingLevel(false);
      setIsSelectingContentType(false);
    } else if (selection === "domain") {
      setIsSelectingDomain(!isSelectingDomain);
      setIsSelectingLanguage(false);
      setIsSelectingLevel(false);
      setIsSelectingContentType(false);
    } else if (selection === "level") {
      setIsSelectingLevel(!isSelectingLevel);
      setIsSelectingDomain(false);
      setIsSelectingLanguage(false);
      setIsSelectingContentType(false);
    } else if (selection === "contentType") {
      setIsSelectingContentType(!isSelectingContentType);
      setIsSelectingDomain(false);
      setIsSelectingLevel(false);
      setIsSelectingLanguage(false);
    }
  };

  const clearFilters = () => {
    setSelectedLanguages([]);
    setSelectedDomains([]);
    setSelectedLevels([]);
    setSelectedContentTypes([]);
    setIsSelectingLanguage(false);
    setIsSelectingDomain(false);
    setIsSelectingLevel(false);
    setIsSelectingContentType(false);
  };
  const updateSelectedLanguages = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((item) => item !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };
  const updateSelectedDomains = (domain) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter((item) => item !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };
  const updateSelectedLevels = (level) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter((item) => item !== level));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };
  const updateSelectedContentTypes = (contentType) => {
    if (selectedContentTypes.includes(contentType)) {
      setSelectedContentTypes(
        selectedContentTypes.filter((item) => item !== contentType)
      );
    } else {
      setSelectedContentTypes([...selectedContentTypes, contentType]);
    }
  };
  return (
    <div className={styles.container}>
      <span className={styles.title}>Filter Items</span>
      <span className={styles.numberOfItems}>{numberOfItems}</span>
      <div className={styles.selectBoxContainer}>
        <div
          className={styles.selectBox}
          style={{ color: selectedLanguages.length > 0 ? "#3B00B9" : "black" }}
          onClick={() => updateCurrentSelection("language")}
        >
          <p className={styles.selectTitle}>Language</p>
          <div className={styles.selectionArrow}>
            {isSelectingLanguage ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
        {isSelectingLanguage && (
          <div className={styles.selectOptionsContainer}>
            <div className={styles.selectOptions}>
              {languageOptions.map((language) => (
                <label className={styles.selectOption}>
                  <input
                    type="checkbox"
                    key={language}
                    value={language}
                    checked={selectedLanguages.includes(language)}
                    onChange={(e) => updateSelectedLanguages(e.target.value)}
                  />
                  {language}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.selectBoxContainer}>
        <div
          className={styles.selectBox}
          style={{ color: selectedDomains.length > 0 ? "#3B00B9" : "black" }}
          onClick={() => updateCurrentSelection("domain")}
        >
          <p className={styles.selectTitle}>Domain</p>
          <div className={styles.selectionArrow}>
            {isSelectingDomain ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
        {isSelectingDomain && (
          <div className={styles.selectOptionsContainer}>
            <div className={styles.selectOptions}>
              {domainOptions.map((domain) => (
                <label className={styles.selectOption}>
                  <input
                    type="checkbox"
                    key={domain}
                    value={domain}
                    checked={selectedDomains.includes(domain)}
                    onChange={(e) => updateSelectedDomains(e.target.value)}
                  />
                  {domain}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.selectBoxContainer}>
        <div
          className={styles.selectBox}
          style={{ color: selectedLevels.length > 0 ? "#3B00B9" : "black" }}
          onClick={() => updateCurrentSelection("level")}
        >
          <p className={styles.selectTitle}>Level</p>
          <div className={styles.selectionArrow}>
            {isSelectingLevel ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
        {isSelectingLevel && (
          <div className={styles.selectOptionsContainer}>
            <div className={styles.selectOptions}>
              {levelOptions.map((level) => (
                <label className={styles.selectOption}>
                  <input
                    type="checkbox"
                    key={level}
                    value={level}
                    checked={selectedLevels.includes(level)}
                    onChange={(e) => updateSelectedLevels(e.target.value)}
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.selectBoxContainer}>
        <div
          className={styles.selectBox}
          style={{
            color: selectedContentTypes.length > 0 ? "#3B00B9" : "black",
          }}
          onClick={() => updateCurrentSelection("contentType")}
        >
          <p className={styles.selectTitle}>Content Type</p>
          <div className={styles.selectionArrow}>
            {isSelectingContentType ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
        {isSelectingContentType && (
          <div className={styles.selectOptionsContainer}>
            <div className={styles.selectOptions}>
              {contentTypeOptions.map((contentType) => (
                <label className={styles.selectOption}>
                  <input
                    type="checkbox"
                    key={contentType}
                    value={contentType}
                    checked={selectedContentTypes.includes(contentType)}
                    onChange={(e) => updateSelectedContentTypes(e.target.value)}
                  />
                  {contentType}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      {(selectedLanguages.length > 0 ||
        selectedDomains.length > 0 ||
        selectedLevels.length > 0 ||
        selectedContentTypes.length > 0) && (
        <div onClick={() => clearFilters()} className={styles.clearFilters}>
          Delete all filters
          <svg
            style={{ marginLeft: "6px" }}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM6 10.8C7.27304 10.8 8.49394 10.2943 9.39411 9.39411C10.2943 8.49394 10.8 7.27304 10.8 6C10.8 4.72696 10.2943 3.50606 9.39411 2.60589C8.49394 1.70571 7.27304 1.2 6 1.2C4.72696 1.2 3.50606 1.70571 2.60589 2.60589C1.70571 3.50606 1.2 4.72696 1.2 6C1.2 7.27304 1.70571 8.49394 2.60589 9.39411C3.50606 10.2943 4.72696 10.8 6 10.8ZM6 5.1516L7.6968 3.4542L8.5458 4.3032L6.8484 6L8.5458 7.6968L7.6968 8.5458L6 6.8484L4.3032 8.5458L3.4542 7.6968L5.1516 6L3.4542 4.3032L4.3032 3.4542L6 5.1516Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
      <div className={styles.sortBy}>
        <p>Sort By</p>
        <div className={styles.sortByArrow}>{<ArrowDown />}</div>
      </div>
    </div>
  );
}

export default Index;
