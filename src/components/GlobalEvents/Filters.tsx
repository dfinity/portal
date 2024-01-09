import React from "react";
import ComboSelect from "../Common/ComboSelect";
import { Pill } from "../Common/Pills/Pills";
import Toggle from "../Common/Toggle";

const Filters: React.FC<{
  showPastEvents: boolean;
  onShowPastEventsChange: (show: boolean) => void;
  topics: string[];
  locations: string[];
  selectedTopic: string;
  selectedLocations: string[];
  onTopicChange: (topic: string) => void;
  onLocationsChange: (locations: string[]) => void;
}> = ({
  showPastEvents,
  onShowPastEventsChange,
  topics,
  locations,
  selectedTopic,
  selectedLocations,
  onTopicChange,
  onLocationsChange,
}) => {
  return (
    <div
      className="
      relative z-1
      px-6 pb-4 pt-16
      overflow-auto
      max-w-full
      
      flex justify-between gap-2 items-start
      dark-pills-scrollbar

      md:container-12
      md:overflow-visible 
    "
    >
      <div className="flex md:flex-wrap gap-2 items-start md:gap-2.5">
        <ComboSelect
          label="Location"
          options={locations.map((l) => ({ label: l, value: l }))}
          selectedValues={selectedLocations}
          onChange={onLocationsChange}
        />
        <div className="flex gap-2 items-center md:contents">
          <Pill
            isActive={!selectedTopic}
            onClick={() => onTopicChange("")}
            variant="dark"
          >
            All
          </Pill>
          {topics.map((topic) => (
            <Pill
              isActive={topic === selectedTopic}
              onClick={() => onTopicChange(topic)}
              variant="dark"
              key={topic}
            >
              {topic}
            </Pill>
          ))}
        </div>
      </div>

      <label
        htmlFor="toggle"
        className="flex items-center gap-3 cursor-pointer whitespace-nowrap tw-title-navigation-on-page"
      >
        <Toggle
          id="toggle"
          value={showPastEvents}
          onChange={(e) => onShowPastEventsChange(e.target.checked)}
        ></Toggle>
        Past Events
      </label>
    </div>
  );
};

export default Filters;
