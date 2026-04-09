import fetch from "node-fetch";
import express from "express";

const host = "localhost";
const port = 3000;

const app = express();
const pool = mysql.createPool(dbconfig);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(port, host, () => console.log(`${host}:${port} kuuntelee...`));
