exports.menuDivider = function (label) {
  return {
    type: "html",
    className: "navbar__link--divider",
    value: `<span>${label}</span>`,
  };
};

exports.intoColumns = function (columns) {
  const flattened = [];
  const maxRows = columns.reduce((acc, col) => Math.max(acc, col.length), 0);
  for (let r = 0; r < maxRows; r++) {
    for (let c = 0; c < columns.length; c++) {
      if (columns[c][r]) {
        flattened.push(columns[c][r]);
      } else {
        flattened.push({
          type: "html",
          value: "<span>&nbsp;</span>",
          className: "navbar__link--dummy",
        });
      }
    }
  }
  return flattened;
};
