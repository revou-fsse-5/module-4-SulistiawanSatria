const jsonServer = require("json-server");
const auth = require("json-server-auth");

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
app.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
app.use(jsonServer.bodyParser);

// /!\ Bind the router db to the app
app.db = router.db;

// You must apply the auth middleware before the router
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(auth);
app.use(router);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
