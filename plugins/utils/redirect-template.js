module.exports = (url) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=${url.to}">
    <link rel="canonical" href="${url.to}" />
  </head>
  <script>
    window.location.href = '${url.to}';
  </script>
</html>
`;
