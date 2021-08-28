module.exports = (app) => {
  const appRoot = require("app-root-path"),
    express = require("express"),
    getGlobalStrings = require(`${appRoot}/lib/global/getGlobalStrings.js`);

  app.get("/", function (req, res) {
    res.set("Content-Type", "text/html");
    res.send(
      Buffer.from(
        '<!DOCTYPE html>\n<html>\n<script type="module">\nimport {buildDOM} from "/index";\nbuildDOM(document)\n</script>\n</html>'
      )
    );
//      res.sendFile(`${appRoot}/index.html`)
  });
};
