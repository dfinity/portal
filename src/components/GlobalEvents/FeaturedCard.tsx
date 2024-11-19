import React, { useMemo } from "react";
import Link from "@docusaurus/Link";
import LinkArrowUpRight from "../Common/Icons/LinkArrowUpRight";
import { AirtableEvent } from "./types";
import { eventBannerUrl, eventDate, eventLocation } from "./EventCard";

const FeaturedCard: React.FC<{ event: AirtableEvent }> = ({ event }) => {
  const formattedEventDate = useMemo(() => eventDate(event), [event]);
  const formattedEventLocation = useMemo(() => eventLocation(event), [event]);

  return (
    <div className="md:h-[450px] flex flex-col md:flex-row rounded-xl overflow-hidden">
      <Link
        className="aspect-video md:w-7/10 flex relative group"
        href={event.eventLink}
      >
        <img
          src={event.imageUrl || "/img/events/featured.webp"}
          alt={event.eventName}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="md:w-3/10 flex bg-white-80 border border-solid border-white md:rounded-tr-xl rounded-br-xl p-8 md:p-12 backdrop-blur-2xl">
        <div className="self-center">
          <p className="text-black tw-title-navigation-on-page mb-3 flex gap-2">
            <span>{formattedEventDate}</span>
            <span>|</span>
            <span>{formattedEventLocation}</span>
          </p>
          <h4 className="mb-0 tw-lead md:tw-lead-lg text-black">
            {event.eventName}
          </h4>
          <p className="text-black/60 tw-paragraph md:tw-lead-sm mb-0 mt-3 line-clamp-3">
            {event.description}
          </p>
          {event.eventLink && event.eventLink !== "#" && (
            <p className="mt-6 mb-0">
              <Link href={event.eventLink} className="link-primary">
                Register now <LinkArrowUpRight />
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export function getFeaturedEvent(
  events: AirtableEvent[]
): AirtableEvent | null {
  if (!events || events.length === 0) {
    return null;
  }

  const currentDate = new Date().toISOString().slice(0, 10);

  try {
    // 1. First priority: Current featured event that hasn't ended
    const currentFeaturedEvent = events.find(
      (event) =>
        event.featured === true && event.endDate && event.endDate >= currentDate
    );

    if (currentFeaturedEvent) {
      return currentFeaturedEvent;
    }

    // 2. Second priority: Next upcoming featured event
    const upcomingFeaturedEvents = events.filter(
      (event) =>
        event.featured === true &&
        event.startDate &&
        event.startDate > currentDate
    );

    if (upcomingFeaturedEvents.length > 0) {
      return upcomingFeaturedEvents.sort((a, b) =>
        a.startDate.localeCompare(b.startDate)
      )[0];
    }

    // Current or upcoming non-featured event
    const nonEndedEvents = events.filter(
      (event) => event.endDate && event.endDate >= currentDate
    );

    if (nonEndedEvents.length > 0) {
      return nonEndedEvents.sort((a, b) =>
        a.startDate.localeCompare(b.startDate)
      )[0];
    }

    // Final fallback: Most recent event overall
    const sortedEvents = [...events].sort((a, b) =>
      b.endDate.localeCompare(a.endDate)
    );

    return sortedEvents[0];
  } catch (error) {
    console.error("Error in getFeaturedEvent:", error);
    return null;
  }
}

export default FeaturedCard;
