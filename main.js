const http = require('http')
const { exec } = require('child_process')

const hostname = '127.0.0.1'
const port = 3000

// create an http server
const server = http.createServer((req, res) => {

    // set the response status and content type
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')

    // start a child process to execute the Ruby script
    const rubySide = exec('ruby app.rb')

    // handle the standard output of the Ruby script
    rubySide.stdout.on('data', (stdout) => {
        res.end(stdout)
    })

    // handle the standard error of the Ruby script
    rubySide.stderr.on('data', (stderr) => {
        // redirect to the Ruby server on port 3001 after accessing the Node port
        // i put this line below because Sinatra requires the node server to be accessed before accessing the Ruby server
        res.writeHead(301, { Location: 'http://127.0.0.1:3001' })
        console.error(stderr)
    })

    // handle the Ruby script process closing
    rubySide.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    })
})

// start the server listening on the specified hostname and port
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})