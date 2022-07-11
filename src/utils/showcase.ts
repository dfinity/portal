export function elegantWebsiteUrl(websiteUrl) {
  const url = new URL(websiteUrl);
  if (
    url.hostname.includes(".ic0.app") ||
    url.hostname.includes(".ic.fleek.co")
  ) {
    const canisterIdMatch = url.hostname.match(/(\w+-\w+-\w+-\w+-\w+)\./);
    if (canisterIdMatch && canisterIdMatch[1]) {
      return canisterIdMatch[1];
    } else {
      return url.hostname + (url.pathname !== "/" ? url.pathname : "");
    }
  } else {
    return url.hostname + (url.pathname !== "/" ? url.pathname : "");
  }
}
