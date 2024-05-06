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
  elements: Element[][];
}

interface Element {
  title: string;
  overview: string;
  description: string;
  forum: string;
  proposal: string;
  wiki?: string;
  docs: string;
  eta?: string;
  status: string;
  is_community?: boolean;
  in_beta?: boolean;
  milestone_id?: string;
  notes?: string;
  imported?: boolean;
}

