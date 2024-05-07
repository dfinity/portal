interface RootObject {
  name: string;
  description: string;
  milestones: Milestone[];
}

interface Milestone {
  name: string;
  description: string;
  milestone_id: string;
  eta: string;
  status?: string;
  elements: (Element | Elements2 | Elements3 | Elements4 | Elements5 | Elements6 | Elements7 | Elements8 | Elements9 | Elements10 | Elements11)[];
}

interface Elements11 {
  title: string;
  overview: string;
  description: string;
  status: string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  is_community: boolean;
  in_beta: boolean;
  notes: string;
  eta?: string;
}

interface Elements10 {
  title: string;
  overview: string;
  description: string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  eta?: string;
  status: string;
  is_community: boolean;
  in_beta: boolean;
  notes: string;
  milestone_id?: string;
}

interface Elements9 {
  title: string;
  overview: string;
  description: string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  eta?: string;
  status: string;
  is_community?: boolean;
  in_beta?: boolean;
  milestone_id?: string;
  notes: string;
}

interface Elements8 {
  title: string;
  overview: string;
  description: string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  eta?: string;
  status: string;
  is_community: boolean;
  in_beta: boolean;
  milestone_id?: string;
  notes: string;
  imported?: boolean;
}

interface Elements7 {
  title: string;
  overview: string;
  description: string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  eta: string;
  status: string;
  is_community?: boolean;
  in_beta: boolean;
  milestone_id?: string;
  notes: string;
  imported?: boolean;
}

interface Elements6 {
  title: string;
  overview: string;
  description: string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  eta: string;
  status: string;
  is_community: boolean;
  in_beta: boolean;
  milestone_id: string;
  notes: string;
  imported: boolean;
}

interface Elements5 {
  title: string;
  overview: string;
  description: string;
  forum: string;
  proposal: string;
  docs: string;
  eta?: string;
  status: string;
  is_community: boolean;
  in_beta: boolean;
  milestone_id?: string;
  notes: string;
  wiki?: string;
  imported?: boolean;
}

interface Elements4 {
  title: string;
  overview: string;
  description: string;
  forum: string;
  proposal: string;
  wiki?: string;
  docs: string;
  eta?: string;
  status: string;
  is_community: boolean;
  in_beta: boolean;
  milestone_id?: string;
  notes?: string;
  imported?: boolean;
}

interface Elements3 {
  title: string;
  overview: string;
  description: string;
  forum: string;
  proposal: string;
  docs: string;
  eta: string;
  status: string;
  is_community: boolean;
  in_beta: boolean;
  notes: string;
  imported?: boolean;
  wiki?: string;
}

interface Elements2 {
  title: string;
  overview: string;
  description: string;
  status: string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  is_community: boolean;
  in_beta: boolean;
  milestone_id: string;
  notes: string;
}

interface Element {
  title: string;
  overview: string;
  description: string;
  forum: string;
  proposal: string;
  wiki: string;
  docs: string;
  eta: string;
  status: string;
  is_community: boolean;
  in_beta: boolean;
  notes: string;
  imported?: boolean;
  milestone_id?: string;
}

