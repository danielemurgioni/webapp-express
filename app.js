const express = require("express")
const app = express()
const port = 3000

//middleware asset statici
app.use(express.static("public"))
//middleware parsing body delle richieste
app.use(express.json())

//import middleware custom
const notFound = require("./middlewares/notFound")
const errorsHandler = require("./middlewares/errorsHandler")

//use middleware custom
app.use(notFound)
app.use(errorsHandler)

//importo della connessione
const connection = require("./data/db")

//rotta madre
app.get("/", (req, res) => {
    res.send("Movies entry point")
})

//rotta index
app.get("/movies", (req, res) => {

    const querySQL = "SELECT * FROM movies"

    connection.query(querySQL, (err, result) => {
        if (err) { res.status(500).json({ error: "Database query failed" }) }
        else { res.json(result) }
    })
})

//rotta show
app.get("/movies/:id", (req, res) => {

    const { id } = req.params

    const movieSql = "SELECT * FROM movies WHERE id = ?"

    const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?"

    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) { res.status(500).json({ error: "Database query failed" }) }
        else {
            const movie = movieResult[0]

            connection.query(reviewsSql, [id], (err, reviewResult) => {
                if (err) { res.status(500).json({ error: "Database query failed" }) }
                else {
                    movie.reviews = reviewResult

                    res.json(movie)
                }
            })
        }
    })
})

//server in ascolto per le richieste
app.listen(port, () => {
    console.log(`Server in ascolto alla porta: ${port}`)
})