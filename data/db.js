//importo la libreria mysql2
const mysql = require("mysql2")

//configurazione della connessione al database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//effetuo la connessione
connection.connect((err) => {
    if (err) { throw err }
    else { console.log("Connession to database successful") }
})

//esporto connection
module.exports = connection