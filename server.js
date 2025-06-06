const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

server.use('/tasks', router);
server.listen(process.env.PORT || 3001, () => {
    console.log('JSON Server is running');
});