import { Handler } from "@netlify/functions";
import * as lunr from "lunr";
lunr.tokenizer.separator = /[\s\-/]+/;

// these dependencies only exist after successful website build
import lunrIndex from "../../build/lunr-index.json";
import searchDocs from "../../build/search-doc.json";

const index = lunr.Index.load(lunrIndex);

const handler: Handler = async (event) => {
  const term = event.queryStringParameters.term as string | undefined;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTION",
  };

  if (!term) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing search term." }),
      headers,
    };
  }

  const queryResult = index.query(function (query) {
    const tokens = lunr.tokenizer(term);
    query.term(tokens, {
      boost: 10,
    });
    query.term(tokens, {
      wildcard: lunr.Query.wildcard.TRAILING,
    });
  });

  const searchResults = queryResult.slice(0, 5).map((res) => ({
    ...res,
    doc: searchDocs[res.ref],
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(searchResults, null, 2),
    headers,
  };
};

export { handler };
