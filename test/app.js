import fs from 'fs';
import http from 'http';
import event from 'events';

// Read the HTML template asynchronously
let customevnt = new event.EventEmitter()

const readIndexFile = () => {
    return new Promise((resolve, reject) => {
        
        fs.readFile('template/index.html', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
                
            }
        });
    });
};
const jsonn = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('data/users.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

// Create an HTTP server
const startServer = async () => {
    try {
        const indexContent = await readIndexFile();
        const jsonread = await jsonn();


        const server = http.createServer((req, res) => {
            if (req.url === "/") {
                customevnt.emit("newevent")
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(indexContent);
            } else if (req.url === "/about") {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("About");
            }
             else if (req.url === "/users") {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(jsonread);
            }
             else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("Error");
            }
        });

        customevnt.on("newevent",()=>
        {
            console.log("Custom event is working")
        })
        server.on("request",()=>
        {
            console.log("req recieevedddd");
        })
        server.listen(3001, () => {
            console.log("Server is listening on port 3001");
        });

    } catch (err) {
        console.error("Error reading index file:", err);
    }
};

// Start the server
startServer();
