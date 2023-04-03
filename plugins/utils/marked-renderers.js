const katex = require("katex");

function renderMathsExpression(expr) {
  if (expr[0] === "$" && expr[expr.length - 1] === "$") {
    let displayStyle = false;
    expr = expr.substr(1, expr.length - 2);
    if (expr[0] === "$" && expr[expr.length - 1] === "$") {
      displayStyle = true;
      expr = expr.substr(1, expr.length - 2);
    }
    let html = null;
    try {
      html = katex.renderToString(expr);
    } catch (e) {
      console.err(e);
    }
    if (displayStyle && html) {
      html = html.replace(
        /class="katex"/g,
        'class="katex katex-block" style="display: block;"'
      );
    }
    return html;
  } else {
    return null;
  }
}

exports.createKatexParagraphRenderer = function (originalRenderer) {
  return (text) => {
    const blockRegex = /\$\$[^\$]*\$\$/g;
    const inlineRegex = /\$[^\$]*\$/g;
    let blockExprArray = text.match(blockRegex);
    let inlineExprArray = text.match(inlineRegex);
    for (let i in blockExprArray) {
      const expr = blockExprArray[i];
      const result = renderMathsExpression(expr);
      text = text.replace(expr, result);
    }
    for (let i in inlineExprArray) {
      const expr = inlineExprArray[i];
      const result = renderMathsExpression(expr);
      text = text.replace(expr, result);
    }
    return originalRenderer(text);
  };
};
