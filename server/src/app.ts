import express from "express";
import { createServer } from "http";

const app = express();

const server = createServer(app);

server.listen(5000, () => {
    console.log(`Server running in port ${5000}`);
})

export default app;

