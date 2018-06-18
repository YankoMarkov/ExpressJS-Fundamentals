const http = require('http')
const url = require('url')
const handlers = require('./handlers/index')
const port = 1717

http.createServer((req, res) => {
    req.path = url.parse(req.url).pathname
    for (let handler of handlers) {
        let response = handler(req, res)
        if (!response) {
            break
        }
    }
}).listen(port)

console.log('I am on port ' + port)