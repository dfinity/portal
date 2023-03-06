import glob
import os
import sys
import lib.extractor as extractor
import json
from tqdm import tqdm


def generate_documents(input_files: str):
  # find all .html files in the `build` directory
  files = glob.glob(input_files, recursive=True)
  files = [f for f in files if os.path.isfile(f)]
  contents = [open(file).read() for file in files]
  # i = 0
  # total = len(files)
  all_docs = []

  url_prefix_len = input_files.find("/*")
  if url_prefix_len == -1:
    url_prefix_len = 0
  with tqdm(total=len(files)) as pbar:
    for file, content in zip(files, contents):

      docs: list[extractor.Document] = extractor.extract_unstructured(
          content, file)
      
      def clean_url(url):
        if len(url[url_prefix_len:]) > 0:
          return url[url_prefix_len:]
        else:
          return "/"

      for doc in docs:
        doc.url = clean_url(doc.url)
        doc.page_url = clean_url(doc.page_url)

      all_docs.extend(docs)
      pbar.update(1)

  # save to json file
  with open('docs.json', 'w') as f:
    json.dump(all_docs, f, default=lambda o: o.__dict__, indent=2)


# get path from command line
input_files = sys.argv[1]

generate_documents(input_files)
