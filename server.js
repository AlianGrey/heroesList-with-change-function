const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('heroes.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

server.use(router);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});