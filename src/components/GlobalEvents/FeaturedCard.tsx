import React, { useMemo } from "react";
import Link from "@docusaurus/Link";
import LinkArrowUpRight from "../Common/Icons/LinkArrowUpRight";
import { AirtableEvent } from "./types";
import { eventBannerUrl, eventDate, eventLocation } from "./EventCard";

const FeaturedCard: React.FC<{ event: AirtableEvent }> = ({ event }) => {
  const image = eventBannerUrl(event);

  const formattedEventDate = useMemo(() => eventDate(event), [event]);
  const formattedEventLocation = useMemo(() => eventLocation(event), [event]);

  return (
    <div className="md:h-[450px] flex flex-col md:flex-row rounded-xl overflow-hidden">
      <Link
        className="aspect-video md:w-7/10 flex relative group"
        href={event.eventLink}
      >
        <img
          src={image}
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
          {event.eventLink && (
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

export function getFeaturedEvent(events: AirtableEvent[]): AirtableEvent {
  const currentDate = new Date().toISOString().slice(0, 10);

  // has a banner and end date (of format yyyy-mm-dd) is in the future
  const maybeOngoingOrFutureEventWithBanner = events.find(
    (event) => event.eventBanner && event.endDate >= currentDate
  );

  if (maybeOngoingOrFutureEventWithBanner) {
    return maybeOngoingOrFutureEventWithBanner;
  }

  // has no banner and in the future
  const maybeMostRecentEvent = events.find(
    (event) => event.endDate >= currentDate
  );

  if (maybeMostRecentEvent) {
    return maybeMostRecentEvent;
  }

  // has a banner and the most recent
  const maybeMostRecentEventWithBanner = [...events]
    .reverse()
    .find((event) => event.eventBanner);

  if (maybeMostRecentEventWithBanner) {
    return maybeMostRecentEventWithBanner;
  }

  // most recent
  return events[events.length - 1];
}

export default FeaturedCard;
