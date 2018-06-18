const fs = require('fs')
const homePath = './views/home.html'

module.exports = (req, res) => {
    if (req.path === '/' && req.method === 'GET') {
        fs.readFile(homePath, (err, data) => {
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
    } else {
        return true
    }
}