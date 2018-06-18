const fs = require('fs')
const url = require('url')
const dbPath = './config/dataBase.json'
const detailsPath = './views/details.html'

module.exports = (req, res) => {
    if (req.path.startsWith('/getDetails') && req.method === 'GET') {
        fs.readFile(detailsPath, (err, data) => {
            if (err) {
                console.log(err.message)
            }
            let jsonDb = fs.readFileSync(dbPath).toString()
            let tempDb = JSON.parse(jsonDb)
            let query = url.parse(req.url, true).query
            let id = query.id
            tempDb = tempDb.find(a => a.id === id)

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                `<div class="content">
                <img src="${tempDb.moviePoster}" alt=""/>
                <h3> Title:  ${tempDb.movieTitle}</h3 >
                <h3>Year: ${tempDb.movieYear}</h3>
                <p> ${tempDb.movieDescription}</p>
                </div>`)
            res.writeHead(200, {
                'content-type': 'text/html'
            })
            res.write(data)
            res.end()
        })
    } else {
        return true
    }
}