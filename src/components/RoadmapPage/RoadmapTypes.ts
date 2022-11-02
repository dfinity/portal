export type CustomUrl = {
  text: string;
  url: string;
};

export type RoadmapItemLink = string | CustomUrl | CustomUrl[];

export type RoadmapItem = {
  name: string;
  description: string;
  links: CustomUrl[];
  is_community?: boolean;
  in_beta?: boolean;
  eta?: string;
};

export type RoadmapDomain = {
  name: string;
  description: string;
  image: {
    card: string;
    overlay: string;
  };
  groups: {
    future: RoadmapItem[];
    upcoming: RoadmapItem[];
    inProgress: RoadmapItem[];
    deployed: RoadmapItem[];
  };
};
