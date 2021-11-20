import { configApp } from "./src/app.js";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = configApp();
app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
