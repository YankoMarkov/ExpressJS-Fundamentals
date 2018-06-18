const fs = require('fs')
const qs = require('querystring')
const db = require('../config/dataBase')
const dbPath = './config/dataBase.json'
const moviePath = './views/addMovie.html'

let addMovie = (req, res) => {
    fs.readFile(moviePath, (err, data) => {
        if (err) {
            console.log(err.message)
            return
        }
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.write(data)
        res.end()
    })
}

module.exports = (req, res) => {
    if (req.path === '/addMovie' && req.method === 'GET') {
        addMovie(req, res)
    } else if (req.path === '/addMovie' && req.method === 'POST') {
        let body = []
        req
            .on('data', chunk => {
                body.push(chunk)
            })
            .on('end', () => {
                body = Buffer.concat(body).toString()
                let movieBody = qs.parse(body)
                let validMovieFlag = true

                for (let prop in movieBody) {
                    if (movieBody[prop] === '') {
                        validMovieFlag = false
                    }
                }
                if (validMovieFlag) {
                    if (!fs.existsSync(dbPath)) {
                        fs.writeFileSync(dbPath, JSON.stringify(db))
                    }
                    let jsonDb = fs.readFileSync(dbPath).toString()
                    let tempDb = JSON.parse(jsonDb)
                    movieBody.id = tempDb.length + 1
                    tempDb.push(movieBody)
                    fs.writeFileSync(dbPath, JSON.stringify(tempDb))

                    fs.readFile(moviePath, (err, data) => {
                        if (err) {
                            console.log(err.message)
                            return
                        }
                        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                            '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>')
                        res.writeHead(200, {
                            'content-type': 'text/html'
                        })
                        res.write(data)
                        res.end()
                    })
                } else {
                    fs.readFile(moviePath, (err, data) => {
                        if (err) {
                            console.log(err.message)
                            return
                        }
                        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                            '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>')
                        res.writeHead(200, {
                            'content-type': 'text/html'
                        })
                        res.write(data)
                        res.end()
                    })
                }
            })
    } else {
        return true
    }
}