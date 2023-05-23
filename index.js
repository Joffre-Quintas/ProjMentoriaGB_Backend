const app = require('./app');
const port = process.env.PORT || 3000;
const startDB = require('./config/db');

startDB()

app.listen(port, console.log('Servidor rodando na porta ' + port))