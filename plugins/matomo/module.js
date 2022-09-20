/** @type {import('@docusaurus/types').ClientModule} */
const module = {
  onRouteUpdate({ location }) {
    // wait for page title to get updated
    setTimeout(() => {
      window._paq.push(["setCustomUrl", location.pathname]);
      window._paq.push(["setDocumentTitle", document.title]);
      window._paq.push(["trackPageView"]);
    });
  },
};
export default module;
