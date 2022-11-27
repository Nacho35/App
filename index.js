const express = require("express");
const dotenv = require("dotenv");

const routes = require("./routes");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api", routes);

dotenv.config();

async function main() {
  await app.listen(PORT);
  console.log(`server running on port ${PORT}`);
}
main();
