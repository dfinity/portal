exports.isLinkExternal = function (url = "") {
  if (url.startsWith("http") || url.startsWith("//")) return true;
  return false;
};
