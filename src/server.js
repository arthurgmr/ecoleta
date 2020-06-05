const express = require("express")
const server = express()


//configurar pasta public
server.use(express.static("public"))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


server.get("/", function(req, res) {
    res.render("index.html")
})

server.get("/create-point", function(req, res) {
    res.render("create-point.html")
})

server.get("/search", function(req, res) {
    res.render("search-results.html")
})


server.listen(3000)
console.log("server is runnig!")