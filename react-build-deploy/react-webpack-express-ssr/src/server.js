import express from "express";
import compression from "compression";
import ssr from "./routes/ssr";
const app = express();

app.use(compression());
app.use(express.static("dist"));
app.use(express.static("public"));

app.use("/ssr", ssr);

app.get("/ex1", (req, res) => {
  res.json({
    name: "name"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});
