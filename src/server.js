const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")


//configurar pasta public
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

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

server.post("/savepoint", (req, res) => {

    const query = `
    INSERT INT places (
        image,
        name,
        address,
        adress2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.render("create-point.html", { err: true  })
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData)



})

server.get("/search", function(req, res) {

    const search = req.query.search

    if(search =="") {
        return res.render("search-results.html", {total:0})   
    }




    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        //contar quantos elementos dentro do array
        const total = rows.length

        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total})   
    })

})


server.listen(3000)
console.log("server is runnig!")