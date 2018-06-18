const fs = require('fs')
const faviconPath = './public/images/favicon.ico'

let fileType = (dataString) => {
    let dataTypes = {
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.ico': 'image/x-icon',
        '.png': 'image/png',
        '.jpg': 'image/jpg'
    }

    for (let type in dataTypes) {
        if (dataString.endsWith(type)) {
            return dataTypes[type]
        }
    }
}

let favHandler = (req, res) => {
    fs.readFile(faviconPath, (err, data) => {
        if (err) {
            console.log(err.message)
            return
        }
        res.writeHead(200, {
            'content-type': fileType(req.path)
        })
        res.write(data)
        res.end()
    })
}

let resData = (req, res) => {
    fs.readFile('.' + req.path, (err, data) => {
        if (err) {
            console.log(err.message)
            return
        }
        res.writeHead(200, {
            'content-type': fileType(req.path)
        })
        res.write(data)
        res.end()
    })
}

module.exports = (req, res) => {
    if (req.path === '/favicon.ico' && req.method === 'GET') {
        favHandler(req, res)
    } else if (req.path.startsWith('/public/') && req.method === 'GET') {
        resData(req, res)
    } else {
        res.end()
    }
}