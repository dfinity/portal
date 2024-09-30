# Public Roadmap

The public roadmap is structured in categories (or themes) as subdirectories in
"entries", such as Chain Fusion or Decentralized AI. Each theme contains
elements which can be either feautures or milestones. A feature is the atomic
unit of the roadmap, while a milestone is an aggregate of multiple features and
additional information about the milestone.

The elements of one category are contained in two files, for ease of
maintenance:

- one file for the already deployed items,
- and another file for the items that are being worked on and future items.

Each feature entry contains the following elements:

- title: mandatory string; title of the feature
- overview: mandatory string; a one- to two- sentence overview
- description: optional string; a paragraph or two of more in-depth description;
  null, undefined, and "" all mean there is no description and the overview
  should be used instead
- status: optional string; null, undefined, and "" all mean the default value of
  "future"
  - deployed: already deployed
  - in_progress: current in progress, i.e., started, but not finished
  - upcoming: scheduled to be worked on once in_progress items have been
    finished
  - future: worked on some time in the future
- forum: optional; a link to a related forum post, if available; null,
  undefined, and "" all mean there is no link available
- proposal: optional; a link to a related NNS proposal, if available; null,
  undefined, and "" all mean there is no link available
- docs: optional; a link to related documentation, if available; null,
  undefined, and "" all mean there is no link available
- eta: optional; the estimated date of arrival, or the deployment date if status
  is "deployed"; null, undefined, and "" all mean there is no date defined
- milestone_id: optional string; foreign key for referencing the milestone this
  feature belongs to; null, undefined, and "" all mean there is no link to a
  milestone
- in_beta: optional boolean; indicates whether the feature is in beta; null,
  undefined, and "" all mean the default value false

Each roadmap entry contains the following elements:

- title: mandatory string; title of the feature
- description: mandatory string; description for the milestone that is to be
  rendered on the web page
- is_milestone: mandatory boolean; indicates that this is a milestone and not a
  feature
- milestone_id: mandatory string; id of the milestone, currently a metal name;
  this is referenced from a feature using the field "milestone_id"
- eta: optional string; the estimated date of arrival, or the deployment date if
  status is "deployed"; null, undefined, and "" all mean there is no date
  defined
