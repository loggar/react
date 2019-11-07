import express from "express";
import App from "../components/app";
import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";

const router = express.Router();

router.get("/", async (req, res) => {
  const theHtml = `
  <html>
  <head><title>My First SSR</title></head>
  <body>
  <h1>My First Server Side Render</h1>
  <div id="reactele">{{{reactele}}}</div>
  <script src="/app.js" charset="utf-8"></script>
  <script src="/vendor.js" charset="utf-8"></script>
  </body>
  </html>
  `;

  // trying to compile the HTML we create into a Handlebar Template.
  const hbsTemplate = hbs.compile(theHtml);

  //where React Server Side rendering works. If you console log the “reactComp” you will see a bunch of HTML generated.
  const reactComp = renderToString(<App />);

  // will be replacing the rendered React DOM into the handlebar variable {{{reactele}}}
  const htmlToSend = hbsTemplate({ reactele: reactComp });

  res.send(htmlToSend);
});

export default router;
