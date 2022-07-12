export type LiveSession = {
  title: string;
  speaker?: string;
  speakerTitle?: string;
  description?: string;
  startTimeUtc?: number | null;
  zoomLink?: string;
  youtubeLink?: string;
  tbdMonth?: string;
  deck?: string;
} & {
  startTimePt?: number | null;
  startTimeEu?: number | null;
};
