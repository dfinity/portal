interface RootObject {
  name: string;
  description: string;
  milestones: Milestone[];
}

interface Milestone {
  name?: string | string;
  milestone_id: string;
  eta: null | string;
  status?: string;
  elements: Element[];
  description?: string;
}

interface Element {
  title: string;
  overview: string;
  forum: string;
  proposal: string;
  docs: string;
  eta?: string;
  status: string;
  is_community?: boolean;
  in_beta?: boolean;
  imported?: boolean;
  milestone_id?: string;
}

