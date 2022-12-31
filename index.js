import { App } from "@tinyhttp/app";
import { logger } from "@tinyhttp/logger";

const app = new App();

const getData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ test: "test" });
    }, 1000);
  });

app
  .use(logger())
  .get("/", (req, res) => {
    getData().then((data) => {
      res.status(200).send(JSON.stringify(data));
    });
  })
  .get("/page/:page/", (req, res) => {
    res.status(200).send(`
      <h1>Some cool page</h1>
      <h2>URL</h2>
      ${req.url}
      <h2>Params</h2>
      ${JSON.stringify(req.params, null, 2)}
  `);
  })
  .listen(3000);
