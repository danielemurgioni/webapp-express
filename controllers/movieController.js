//importo la connessione
const connection = require("../data/db")

//metodo index
const index = (req, res) => {

    const querySQL = "SELECT * FROM movies"

    connection.query(querySQL, (err, result) => {
        if (err) { res.status(500).json({ error: "Database query failed" }) }
        else { res.json(result) }
    })
}

//metodo show
const show = (req, res) => {

    const { id } = req.params

    const movieSql = "SELECT * FROM movies WHERE id = ?"

    const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?"

    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) { res.status(500).json({ error: "Database query failed" }) }
        if (movieResult.length === 0) { return res.status(404).json({ error: "Movie Not Found" }) }
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
}

module.exports = { index, show }