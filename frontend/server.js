// Import express and node:path
const express = require("express");
const path = require("path");
const port = 8000;

// Create express app
const app = express();

app.use("/static", express.static(path.resolve("client", "static")));

// GET request
// For all paths, return index.html
app.get("/*", (req, res) => {
    res.sendFile(path.resolve("client", "index.html"));
})

app.listen(port, () => console.log(`Express server running @ 192.168.0.106:${port}`));