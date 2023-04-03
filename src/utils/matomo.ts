declare global {
  interface Window {
    _paq: any;
  }
}

export function trackEvent(
  category: string,
  name: string,
  action?: string,
  value?: string
) {
  try {
    window._paq.push(["trackEvent", category, name, action, value]);
  } catch {}
}
