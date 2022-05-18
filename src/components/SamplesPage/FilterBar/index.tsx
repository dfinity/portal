import React from "react";
import styles from "./index.module.css";
import ArrowDown from "@site/static/img/samples/arrowDown.svg";
import ArrowUp from "@site/static/img/samples/arrowUp.svg";
import Delete from "@site/static/img/samples/delete.svg";

const languageOptions = ["Motoko", "Rust", "Javascript"];
const domainOptions = ["Global", "Gaming", "DeFi", "Website", "NFT", "IoT"];
const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const contentTypeOptions = ["Code Samples", "Videos", "Documentation"];
const sortByOptions = ["Relevance", "A to Z", "Z to A"];

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
  selectedSortBy,
  setSelectedSortBy,
}) {
  const [isSelectingLanguage, setIsSelectingLanguage] = React.useState(false);
  const [isSelectingDomain, setIsSelectingDomain] = React.useState(false);
  const [isSelectingLevel, setIsSelectingLevel] = React.useState(false);
  const [isSelectingContentType, setIsSelectingContentType] =
    React.useState(false);
  const [isSelectingSortBy, setIsSelectingSortBy] = React.useState(false);

  const updateCurrentSelection = (selection) => {
    if (selection === "language") {
      setIsSelectingLanguage(!isSelectingLanguage);
      setIsSelectingDomain(false);
      setIsSelectingLevel(false);
      setIsSelectingContentType(false);
      setIsSelectingSortBy(false);
    } else if (selection === "domain") {
      setIsSelectingDomain(!isSelectingDomain);
      setIsSelectingLanguage(false);
      setIsSelectingLevel(false);
      setIsSelectingContentType(false);
      setIsSelectingSortBy(false);
    } else if (selection === "level") {
      setIsSelectingLevel(!isSelectingLevel);
      setIsSelectingDomain(false);
      setIsSelectingLanguage(false);
      setIsSelectingContentType(false);
      setIsSelectingSortBy(false);
    } else if (selection === "contentType") {
      setIsSelectingContentType(!isSelectingContentType);
      setIsSelectingDomain(false);
      setIsSelectingLevel(false);
      setIsSelectingLanguage(false);
      setIsSelectingSortBy(false);
    } else if (selection === "sortBy") {
      setIsSelectingSortBy(!isSelectingSortBy);
      setIsSelectingLanguage(false);
      setIsSelectingDomain(false);
      setIsSelectingLevel(false);
      setIsSelectingContentType(false);
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
    setIsSelectingSortBy(false);
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
  const updateSelectedSortBy = (contentType) => {
    setSelectedSortBy(contentType);
    setIsSelectingSortBy(false);
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
          <p style={{ marginBottom: 0, marginRight: "6px" }}>
            Delete all filters
          </p>
          <Delete />
        </div>
      )}
      <div className={styles.sortByContainer}>
        <div
          className={styles.sortBy}
          onClick={() => updateCurrentSelection("sortBy")}
        >
          <p>Sort By</p>
          <div className={styles.selectionArrow}>
            {isSelectingSortBy ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
        {isSelectingSortBy && (
          <div className={styles.sortByOptionsContainer}>
            <div className={styles.selectOptions}>
              {sortByOptions.map((sortOption) => (
                <label className={styles.selectOption}>
                  <input
                    type="checkbox"
                    key={sortOption}
                    value={sortOption}
                    checked={selectedSortBy.includes(sortOption)}
                    onChange={(e) => updateSelectedSortBy(e.target.value)}
                  />
                  {sortOption}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
