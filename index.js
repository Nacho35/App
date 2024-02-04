const express = require("express");
const dotenv = require("dotenv");

const routes = require("./routes");

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/api", routes);

dotenv.config();

async function main() {
	await app.listen(PORT);
	console.log(`Server running on http://localhost:${PORT}/api`);
}
main();
