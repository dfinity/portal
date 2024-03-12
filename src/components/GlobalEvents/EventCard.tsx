import { format, isValid } from "date-fns";
import React, { useMemo } from "react";
import { AirtableEvent } from "./types";

import Link from "@docusaurus/Link";
import LinkArrowUpRight from "../Common/Icons/LinkArrowUpRight";

export function eventBannerUrl(event: AirtableEvent): string {
  return event.imageUrl || "/img/events/placeholder.webp";
}

export function eventLocation(event: AirtableEvent): string {
  if (event.regions === "Online") {
    return "Online";
  } else if (event.city && event.country) {
    if (event.city === event.country) {
      return event.city;
    } else {
      return `${event.city}, ${event.country}`;
    }
  } else if (event.city) {
    return event.city;
  } else if (event.country) {
    return event.country;
  } else if (event.regions) {
    return event.regions;
  }
}

export function eventDate(event): string {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  if (startDate.toString() == "Invalid Date") {
    console.warn("Invalid date", event);
    return "";
  }

  const currentYear = new Date().getFullYear();

  if (!isValid(endDate) || event.startDate === event.endDate) {
    if (startDate.getFullYear() === currentYear) {
      return format(startDate, "MMM d");
    } else {
      return format(startDate, "MMM d, yyyy");
    }
  }

  if (startDate.getMonth() === endDate.getMonth()) {
    if (startDate.getFullYear() === currentYear) {
      return `${format(startDate, "MMM d")}-${format(endDate, "d")}`;
    } else {
      return `${format(startDate, "MMM d")}-${format(endDate, "d, yyyy")}`;
    }
  } else {
    if (startDate.getFullYear() === currentYear) {
      return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`;
    } else {
      return `${format(startDate, "MMM d")} - ${format(
        endDate,
        "MMM d, yyyy"
      )}`;
    }
  }
}

const EventCard: React.FC<{ event: AirtableEvent }> = ({ event }) => {
  const imageUrl = eventBannerUrl(event);

  const formattedEventDate = useMemo(() => eventDate(event), [event]);
  const formattedEventLocation = useMemo(() => eventLocation(event), [event]);

  return (
    <div className="overflow-hidden rounded-xl flex flex-col">
      <div className="relative flex">
        <img
          src={imageUrl}
          alt={event.eventName}
          className="h-[200px] w-full object-cover object-center"
        />
        <span className="absolute max-w-[calc(100%-32px)] -bottom-4 left-4 bg-white/40 backdrop-blur-2xl rounded-full py-1 px-3 tw-title-navigation-on-page flex gap-2 whitespace-nowrap">
          <span>{formattedEventDate}</span>
          <span>|</span>
          <span className="text-ellipsis overflow-hidden">
            {formattedEventLocation}
          </span>
        </span>
      </div>
      <div className="bg-white px-6 pb-6 pt-8 flex-1">
        <h4 className="tw-lead mb-3">{event.eventName}</h4>
        <p className="whitespace-pre-wrap tw-paragraph-sm text-black/60 mb-3 line-clamp-5">
          {event.description}
        </p>
        <p className="mb-0">
          <Link className="link-primary link-with-icon" href={event.eventLink}>
            Details
            <LinkArrowUpRight />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EventCard;
