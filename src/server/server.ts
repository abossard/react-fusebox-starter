import * as dotenv from "dotenv";
import * as Koa from 'koa';
import * as mount from "koa-mount";
import * as serve from "koa-static";
import {handleRender} from "./handleRender";

dotenv.config();

const {
    PORT = 3001,
    HOST = "0.0.0.0",
    REDIS_API_URL = "",
} = process.env;

const app = new Koa();

app.proxy = true;

app.use(mount("/static", serve("./dist/htdocs")));

app.use(handleRender);

app.listen(Number(PORT), HOST, () => {
    process.stdout.write(`Running on http://${HOST}:${PORT} \n`);
});

process.on("SIGINT", () => {
    process.stdout.write("Shutdown.");
    process.exit(0);
});
