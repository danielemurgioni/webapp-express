const express = require("express")
const app = express()
const port = 3000

//importo il router
const moviesRouter = require("./routers/movieRouter")

//middleware asset statici
app.use(express.static("public"))
//middleware parsing body delle richieste
app.use(express.json())

//import middleware custom
const notFound = require("./middlewares/notFound")
const errorsHandler = require("./middlewares/errorsHandler")


//rotta madre
app.get("/", (req, res) => {
    res.send("Movies entry point")
})

app.use("/api/movies", moviesRouter)

//use middleware custom
app.use(notFound)
app.use(errorsHandler)

//server in ascolto per le richieste
app.listen(port, () => {
    console.log(`Server in ascolto alla porta: ${port}`)
})