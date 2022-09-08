export function isSafari(userAgent: string) {
  return (
    userAgent.includes("Safari/") &&
    !userAgent.includes("Chrome/") &&
    !userAgent.includes("Chromium/")
  );
}
