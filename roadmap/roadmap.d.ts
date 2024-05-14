interface RootObject {
  name: string;
  description: string;
  milestones: Milestone[];
}

interface Milestone {
  name: string;
  description: string;
  milestone_id: string;
  eta: null | string | string;
  status?: string;
  elements: (
    | Element
    | Elements2
    | Elements3
    | Elements4
    | Elements5
    | Elements6
    | Elements7
    | Elements8
    | Elements9
    | Elements10
  )[];
}

interface Elements10 {
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
}

interface Elements9 {
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
  wiki?: string;
  imported?: boolean;
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
  is_community?: boolean;
  in_beta?: boolean;
  milestone_id?: string;
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
  imported?: boolean;
}

interface Elements6 {
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
  milestone_id?: string;
  eta?: string;
  imported?: boolean;
}

interface Elements5 {
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
}

interface Elements4 {
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
  milestone_id?: string;
}

interface Elements3 {
  title: string;
  overview: string;
  description: string;
  forum: string;
  proposal: string;
  wiki?: string;
  docs: string;
  eta: string;
  status: string;
  is_community: boolean;
  in_beta: boolean;
  imported?: boolean;
}

interface Elements2 {
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
  milestone_id?: string;
  imported?: boolean;
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
  milestone_id: string;
  imported: boolean;
}
