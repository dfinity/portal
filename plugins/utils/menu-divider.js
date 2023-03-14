module.exports = function menuDivider(label) {
  return {
    type: "html",
    className: "navbar__link--divider",
    value: `<span>${label}</span>`,
  };
};
