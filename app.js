const express = require("express")
const app = express()
const port = 3000

//rotta madre
app.get("/", (req, res) => {
    res.send("hello")
})

//server in ascolto per le richieste
app.listen(port, () => {
    console.log(`Server in ascolto alla porta: ${port}`)
})