const fs = require('fs')
const dbPath = './config/dataBase.json'
const viewAllPath = './views/viewAll.html'

module.exports = (req, res) => {
    if (req.path === '/viewAll' && req.method === 'GET') {
        fs.readFile(viewAllPath, (err, data) => {
            if (err) {
                console.log(err.message)
                return
            }
            let jsonDb = fs.readFileSync(dbPath).toString()
            let tempDb = JSON.parse(jsonDb)
            let container = ''

            for (let obj of tempDb) {
                container += `<div class="movie"><a href="/getDetails?id=${obj.id}"><img class="moviePoster" src="${obj.moviePoster}"/></div>`
            }
            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', container)
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