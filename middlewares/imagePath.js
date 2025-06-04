const imagePath = (req, res, next) => {
    req.imagePath = `${req.protocol}://${req.get("host")}/img/movies`
    next()
    console.log(req.imagePath)
}

module.exports = imagePath