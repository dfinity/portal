import FilterIcon from "@site/static/img/svgIcons/filter.svg";
import clsx from "clsx";
import React, { ReactNode } from "react";
import ComboSelect, { ComboSelectUnrolled } from "../Common/ComboSelect";
import { Pill } from "../Common/Pills/Pills";
import SideDrawer from "../Common/SideDrawer/index";
import StageModifications from "../Common/StageModifications/index";
import Toggle from "../Common/Toggle";

const PastEventsToggle = ({ showPastEvents, onShowPastEventsChange }) => {
  return (
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
  );
};

const FilterPills: React.FC<{
  onTypeChange: (type: string) => void;
  types: string[];
  selectedType: string;
  className?: string;
}> = ({ onTypeChange, selectedType, types, className }) => {
  return (
    <div className={clsx("flex gap-2 items-center", className)}>
      <Pill
        isActive={!selectedType}
        onClick={() => onTypeChange("")}
        variant="dark"
      >
        All
      </Pill>
      {types.map((type) => (
        <Pill
          isActive={type === selectedType}
          onClick={() => onTypeChange(type)}
          variant="dark"
          key={type}
        >
          {type}
        </Pill>
      ))}
    </div>
  );
};

const TotalCount: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <span className="tw-title-navigation-on-page bg-white text-black rounded-full px-2 py-1">
      {children}
    </span>
  );
};

const Filters: React.FC<{
  showPastEvents: boolean;
  onShowPastEventsChange: (show: boolean) => void;
  types: string[];
  locations: string[];
  selectedType: string;
  selectedLocations: string[];
  onTypeChange: (type: string) => void;
  onLocationsChange: (locations: string[]) => void;
  filteredCount: number;
}> = ({
  showPastEvents,
  onShowPastEventsChange,
  types,
  locations,
  selectedType,
  selectedLocations,
  onTypeChange,
  onLocationsChange,
  filteredCount,
}) => {
  const [showMobileFilterDrawer, setShowMobileFilterDrawer] =
    React.useState(false);

  const selectableLocations = locations.map((l) => ({ label: l, value: l }));

  function clearFilters() {
    onTypeChange("");
    onLocationsChange([]);
    onShowPastEventsChange(false);
    setShowMobileFilterDrawer(false);
  }

  return (
    <div className="container-12 relative md:z-1 ">
      <div className="md:hidden pt-10">
        <button
          className="font-circular border-none appearance-none bg-transparent text-black tw-heading-6 inline-flex items-center gap-2.5"
          onClick={() => setShowMobileFilterDrawer(true)}
        >
          <FilterIcon />
          Filter Events <TotalCount>{filteredCount}</TotalCount>
        </button>
        <SideDrawer
          show={showMobileFilterDrawer}
          onClose={() => setShowMobileFilterDrawer(false)}
        >
          <StageModifications
            clone={(data) => ({ ...data })}
            data={{
              showPastEvents,
              selectedType,
              selectedLocations,
            }}
            onApply={({ showPastEvents, selectedType, selectedLocations }) => {
              onShowPastEventsChange(showPastEvents);
              onTypeChange(selectedType);
              onLocationsChange(selectedLocations);
              setShowMobileFilterDrawer(false);
            }}
          >
            {({ clonedData, apply, setClonedData }) => (
              <div className="px-6 pt-6 pb-20">
                <h2 className="tw-heading-4 mb-6">Filter Events</h2>

                <h3 className="tw-heading-5 mb-3">Location</h3>
                <ComboSelectUnrolled
                  options={selectableLocations}
                  selectedValues={clonedData.selectedLocations}
                  onChange={(newData) => {
                    setClonedData({
                      ...clonedData,
                      selectedLocations: newData,
                    });
                  }}
                ></ComboSelectUnrolled>

                <h3 className="tw-heading-5 mb-3 mt-6">Types</h3>
                <FilterPills
                  className="flex-wrap"
                  onTypeChange={(newData) => {
                    setClonedData({
                      ...clonedData,
                      selectedType: newData,
                    });
                  }}
                  selectedType={clonedData.selectedType}
                  types={types}
                ></FilterPills>

                <h3 className="tw-heading-5 mb-3 mt-6">Past events</h3>
                <PastEventsToggle
                  showPastEvents={clonedData.showPastEvents}
                  onShowPastEventsChange={(newData) => {
                    setClonedData({
                      ...clonedData,
                      showPastEvents: newData,
                    });
                  }}
                />

                <div className="flex flex-col items-center gap-2 mt-6">
                  <button className="button-primary" onClick={apply}>
                    Apply filters
                  </button>
                  <button className="button-ghost" onClick={clearFilters}>
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </StageModifications>
        </SideDrawer>
      </div>

      <div
        className="
          hidden
          pb-4 pt-16
          md:flex justify-between gap-2 items-start
        "
      >
        <div className="flex md:flex-wrap gap-2 items-start md:gap-2.5">
          <ComboSelect
            label="Location"
            options={selectableLocations}
            selectedValues={selectedLocations}
            onChange={onLocationsChange}
          />
          <FilterPills
            className="md:contents"
            onTypeChange={onTypeChange}
            selectedType={selectedType}
            types={types}
          ></FilterPills>
        </div>
        <PastEventsToggle
          showPastEvents={showPastEvents}
          onShowPastEventsChange={onShowPastEventsChange}
        />
      </div>
    </div>
  );
};

export default Filters;
