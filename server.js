// Import express and node:path
const express = require("express");
const path = require("path");

// Create express app
const app = express();

app.use("/static", express.static(path.resolve("client", "static")));

// For all paths, return index.html
app.get("/*", (req, res) => {
    res.sendFile(path.resolve("client", "index.html"));
})

app.listen(8000, () => console.log("Express server running..."));