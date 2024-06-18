interface RootObject {
  name: string;
  description: string;
  milestones: Milestone[];
}

interface Milestone {
  name: string;
  description?: string | string;
  metal: string;
  eta: string;
  elements: (Element | Elements2 | Elements3 | Elements4 | Elements5 | Elements6 | Elements7 | Elements8 | Elements9 | Elements10 | Elements11)[];
}

interface Elements11 {
  title: string;
  overview: string;
  description: string;
  stack_rank: number | number | string;
  progress: string;
  forum: string;
  proposal: string;
  wiki?: string;
  docs: string;
  is_community: boolean;
  in_beta: boolean | boolean | string;
  milestone?: string;
  notes?: string;
  eta?: string;
  imported?: boolean;
}

interface Elements10 {
  title: string;
  overview: string;
  description: string;
  forum: string;
  proposal: string;
  docs: string;
  eta: string;
  progress: string;
  is_community: boolean;
  in_beta: boolean;
  notes: string;
  imported?: boolean;
  stack_rank?: number;
  wiki?: string;
}

interface Elements9 {
  title: string;
  overview: string;
  description: string;
  stack_rank?: number;
  progress: string;
  forum: string;
  proposal: string;
  wiki?: string;
  docs: string;
  is_community: boolean | boolean | string;
  in_beta: boolean | boolean | string;
  milestone?: string;
  notes: string;
  eta?: string;
  imported?: boolean;
}

interface Elements8 {
  title: string;
  overview: string;
  description: string;
  stack_rank: number | number | string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  eta?: string;
  progress: string;
  is_community: boolean | boolean | string;
  in_beta: boolean | boolean | string;
  milestone?: string;
  notes: string;
  imported?: boolean;
}

interface Elements7 {
  title: string;
  overview: string;
  description: string;
  stack_rank: number;
  progress: string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  is_community: boolean;
  in_beta: boolean;
  notes: string;
  eta?: string;
}

interface Elements6 {
  title: string;
  overview: string;
  description: string;
  stack_rank: number;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  eta: string;
  progress: string;
  is_community: boolean;
  in_beta: boolean;
  notes: string;
  imported?: boolean;
  milestone?: string;
}

interface Elements5 {
  title: string;
  overview: string;
  description: string;
  stack_rank: number;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  eta?: string;
  progress: string;
  is_community?: boolean;
  in_beta?: boolean;
  milestone?: string;
  notes: string;
}

interface Elements4 {
  title: string;
  overview: string;
  description: string;
  stack_rank?: number | number | string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  eta: string;
  progress: string;
  is_community?: boolean | string;
  in_beta: boolean | boolean | string;
  milestone?: string;
  notes: string;
  community?: boolean;
  imported?: boolean;
}

interface Elements3 {
  title: string;
  overview: string;
  description: string;
  stack_rank: number;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  eta: string;
  progress: string;
  is_community: boolean;
  in_beta: boolean;
  milestone: string;
  notes: string;
  imported: boolean;
}

interface Elements2 {
  title: string;
  overview: string;
  description: string;
  stack_rank: number;
  progress: string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  is_community: boolean;
  in_beta: boolean;
  milestone: string;
  notes: string;
}

interface Element {
  title: string;
  overview: string;
  description: string;
  stack_rank: number | string;
  progress: string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  is_community: boolean | string | string;
  in_beta: boolean | string | string;
  milestone?: string;
  notes: string;
  eta?: string;
}

