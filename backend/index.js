const path = require('path');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname, './data/db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)

// Route writes
server.use(jsonServer.rewriter({
  "/api/*": "/$1",
  "/schemas/:api/:object": "/schemas/:api:object",
}));

server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})
