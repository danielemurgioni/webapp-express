const express = require("express")
const app = express()
const port = 3000

//importo della connessione
const connection = require("./data/db")

//rotta madre
app.get("/", (req, res) => {
    res.send("Movies entry point")
})

//rotta index
app.get("/movies", (req, res) => {

    const querySQL = "SELECT * FROM db_movie.movies"

    connection.query(querySQL, (err, result) => {
        if (err) { res.status(500).json({ error: "Database query failed" }) }
        else { res.json(result) }
    })
})

//server in ascolto per le richieste
app.listen(port, () => {
    console.log(`Server in ascolto alla porta: ${port}`)
})