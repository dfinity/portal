const marked = require("marked");
marked.use({
  breaks: true,
  gfm: true,
});
const renderer = new marked.Renderer();
renderer.link = (href, title, text) => text;
renderer.heading = (text, level) => "\n" + text + "\n";
renderer.paragraph = (text) => text + "\n";
renderer.list = (body, ordered, start) => body + "\n";
renderer.listitem = (text) => `- ${text}\n`;
renderer.strong = (text) => text;
renderer.em = (text) => text;
renderer.codespan = (text) => text;
renderer.br = () => "\n\n";
renderer.hr = () => "\n---\n";
renderer.blockquote = (text) => text;
renderer.table = (header, body) => "";
renderer.tablerow = (content) => "";
renderer.tablecell = (content, flags) => "";
renderer.image = (href, title, text) => "";
renderer.code = (code, language) => code;

function markdownToPlainText(markdown) {
  const html = marked.parse(markdown, { renderer });

  // remove all html tags
  let plainText = html.replace(/<[^>]*>?/gm, "");

  // replace entities
  plainText = plainText
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  plainText = plainText.replace(/\*\*/g, "");

  plainText = plainText.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec);
  });

  return plainText.trim();
}

module.exports = markdownToPlainText;

// console.log(
//   markdownToPlainText(
//     "## **About this event**\n\n## **FDU Vancouver Host: Tech Party**\nGet ready for an electrifying evening of tech enthusiasts and networking at the FDU Vancouver Host: Tech Party! Join us on **Wednesday, November 1, 2023** at **12:00 PM** (Pacific Daylight Saving Time) for an in-person event that will bring together industry professionals, students, and technology enthusiasts under one roof.\nEvent Overview:\nThe FDU Vancouver Blockchain & AI Club is elated to announce its flagship Tech Party, an unprecedented convergence of thought leaders, tech aficionados, and entrepreneurs. This highly anticipated gathering aims to propel discussions around transformative technologies like Blockchain, Artificial Intelligence, and most importantly, the Internet Computer—enabled by our esteemed partner, ICP.Hub North America.\nSpecial Focus: ICP.Hub North America\nWe are proud to introduce ICP.Hub North America as our featured guest. With an ethos grounded in innovation, ICP.Hub North America serves as a beacon for pushing the boundaries of what the Internet Computer can achieve, fostering its utility in decentralized architectures and smart contracts. ICP (Internet Computer Protocol) is a revolutionary blockchain technology that aims to reinvent the way we view and utilize the internet, by providing a seamless platform to host smart contracts and dApps, outside the purview of centralized control.\nEvent Topics:\n1. **Blockchain Technologies: **Dive into the architecture, use-cases, and future directions of blockchain technologies, with real-world applications ranging from finance to healthcare.\n2. **Internet Computer Overview:** Presented by ICP.Hub North America, this segment will offer a comprehensive guide to understanding the Internet Computer's functionalities, its purpose in reshaping the internet, and how it interfaces with decentralized applications.\n3. **Decentralized Clouds:** Understand how decentralized cloud infrastructures are disrupting traditional data centers, providing a more secure, robust, and user-centric solution for storing and processing data.\nWhy You Should Attend:\n- Gain unparalleled insights into cutting-edge technologies that are shaping the future.\n- Network with industry experts and potential collaborators.\n- Engage in interactive sessions and get your questions answered by pioneers in the field.\nWe look forward to your presence at this groundbreaking event. Together, let's pave the way for a more decentralized and empowered future.\nThis event promises to be a milestone in tech conversations within the Vancouver ecosystem, and we are confident it will catalyze future collaborations and innovations. We eagerly await your participation.\n\n"
//   )
// );
