const minimist = require('minimist');
const http = require("http");
const fs = require("fs");

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", (err, home) => {
    if (err) throw err;
    homeContent = home;
});

fs.readFile("project.html", (err, project) => {
    if (err) throw err;
    projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
    if (err) throw err;
    registrationContent = registration;
});

const args = minimist(process.argv.slice(2), {
  default: {
    port: 5000,
  },
});

const port = args.port;

http.createServer((req, res) => {
    let url = req.url;
    res.writeHeader(200, {"Content-Type": "text/html"});

    if (url === "/") {
        res.write(homeContent);
        res.end();
    } else if (url === "/project") {
        res.write(projectContent);
        res.end();
    } else if (url === "/registration") {
        res.write(registrationContent);
        res.end();
    }

}).listen(port);