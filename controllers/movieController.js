//importo la connessione
const connection = require("../data/db")

//metodo index
const index = (req, res) => {

    const querySQL = "SELECT * FROM movies"

    connection.query(querySQL, (err, moviesResult) => {
        if (err) { res.status(500).json({ error: "Database query failed" }) }
        else {
            //sovrascrivo il valore image dell'array movieResult
            const movies = moviesResult.map((movie) => {
                const obj = {
                    ...movie,
                    image: req.imagePath + movie.image
                }
                return obj
            })

            res.json(movies)
        }
    })
}

//metodo show
const show = (req, res) => {

    const { id } = req.params

    const movieSql = `
    SELECT movies.*, ROUND(AVG(reviews.vote)) AS average_vote
    FROM movies 
    JOIN reviews ON reviews.movie_id = movies.id
    WHERE movies.id = ?`

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

                    //sovrascrivo il voto
                    movie.average_vote = parseInt(movie.average_vote)

                    res.json({
                        ...movie,
                        image: req.imagePath + movie.image
                    })
                }
            })
        }
    })
}

module.exports = { index, show }