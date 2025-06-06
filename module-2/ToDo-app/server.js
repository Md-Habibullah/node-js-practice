const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/todos' && req.method === 'GET') {
        res.writeHead(201, {
            "content-type": "text/plain"
        })
        res.end('All Todos')
    } else {
        res.end('No route found')
    }
})

server.listen(5000, "127.0.0.1", () => {
    console.log('server is running...')
})