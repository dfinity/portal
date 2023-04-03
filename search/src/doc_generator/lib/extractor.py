from bs4 import BeautifulSoup
from bs4.element import Tag, NavigableString


class Document:
  def __init__(self, content: str, url: str, page_url:str, title: str, excerpt: str, title_level: int, page_title: str):
    self.content = content
    self.url = url
    self.page_url = page_url
    if self.url.endswith("/index.html"):
      self.url = self.url[:-11]

    self.title = title
    self.excerpt = excerpt
    self.title_level = title_level
    self.page_title = page_title

  def print(self):

    print("--------------------------------")
    print(f"page_title=`{self.page_title}`")
    print(f"title=`{self.title}` [{self.title_level}]")

    # print content line by line, stripping leading and trailing whitespace, using grey color
    for line in self.content.splitlines():
      print(f"  \033[90m{line.strip()}\033[0m")


class ExtractedContent:
  def __init__(self, title: str, content: str, title_level: int, id: str):
    self.title = title
    self.content = content
    self.title_level = title_level
    self.id = id


def extract_node(el: Tag) -> list[ExtractedContent]:

  if isinstance(el, NavigableString):
    return []

  if el.name in ["h1", "h2", "h3", "h4"]:
    content = ""
    for sib in el.next_siblings:
      if sib.name in ["h1", "h2", "h3", "h4"]:
        break
      content += ' '+sib.get_text(separator=" ")+"\n"

    if not 'id' in el.attrs:
      el['id'] = ''

    title = el.get_text(separator=" ").strip()

    if title == "":
      return []

    return [ExtractedContent(title, content.strip(), int(el.name[1]), el.get("id"))]

  all_headers = el.find_all(["h1", "h2", "h3", "h4"])
  all_header_levels = [int(h.name[1]) for h in all_headers]

  if len(all_header_levels) == 0:
    return []

  if len(set(all_header_levels)) < len(all_header_levels):
    # there are multiple headers with the same level
    child_documents = []
    for child in el.children:
      child_documents.extend(extract_node(child))
    return child_documents

  else:
    # this is a single document
    
    # find first child with id attibute

    def find_id(el: Tag) -> str:
      if el.name in ["svg"]:
        return ""
      if 'id' in el.attrs:
        return el.get("id")
      for child in el.children:
        if isinstance(child, NavigableString):
          continue
        id = find_id(child)
        if id != "":
          return id
      return ""

    id = find_id(el)

    title = all_headers[0].get_text(separator=" ").strip()

    if title == "":
      return []

    return [ExtractedContent(title, el.get_text(separator=" ").strip(), int(all_headers[0].name[1]), id)]
    # return [(all_headers[0].get_text(), el.get_text())]


def clean_str(s: str):
  return ' '.join(s.split()).replace("\u200b", "").strip()


def extract_unstructured(html: str, url: str) -> list[Document]:
  soup = BeautifulSoup(html, "html.parser")
  documents = []

  main_wrapper = soup.find("div", {"class": "main-wrapper"})
  if main_wrapper is None:
    return []

  h1 = soup.find("h1")
  if h1 is None:
    page_title = soup.title.get_text(separator=" ").strip()
  else:
    page_title = h1.get_text(separator=" ").strip()

  for el in main_wrapper.children:
    docs = extract_node(el)
    for doc in docs:

      if doc.title == doc.content:
        continue

      def clean_url(url: str) -> str:
        if url.endswith("/index.html"):
          return url[:-10]
        elif url.endswith(".html"):
          return url[:-5]

      page_url = clean_url(url)
      new_url = page_url

      if doc.id:
        if new_url.endswith("/"):
          new_url += '#' + doc.id
        else:
          new_url += '/#' + doc.id

      documents.append(Document(clean_str(doc.content), new_url, page_url,
                       clean_str(doc.title), clean_str(doc.content[:100]), doc.title_level, page_title=clean_str(page_title)))
  return documents


if __name__ == "__main__":
  # url = "build/capabilities/index.html"
  # url = "build/docs/current/motoko/main/base/HashMap/index.html"
  # url = "build/docs/current/developer-docs/frontend/my-contacts/index.html"
  url = "test_build/overview/index.html"
  for doc in extract_unstructured(open(url).read(), url):
    doc.print()
