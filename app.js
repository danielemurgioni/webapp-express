const express = require("express")
const app = express()
const port = 3000

//importo CORS (per accettare le richieste dal frontend)
const cors = require("cors")

//importo il router
const moviesRouter = require("./routers/movieRouter")

//middleware CORS
app.use(cors({ origin: process.env.FE_APP }))

//middleware asset statici
app.use(express.static("public"))
//middleware parsing body delle richieste
app.use(express.json())

//import middleware custom
const notFound = require("./middlewares/notFound")
const errorsHandler = require("./middlewares/errorsHandler")
const imagePath = require("./middlewares/imagePath")

//middleware custom imagePath
app.use(imagePath)

//rotta madre
app.get("/", (req, res) => {
    res.send("Movies entry point")
})

app.use("/api/movies", moviesRouter)

//middleware custom di errore
app.use(notFound)
app.use(errorsHandler)

//server in ascolto per le richieste
app.listen(port, () => {
    console.log(`Server in ascolto alla porta: ${port}`)
})