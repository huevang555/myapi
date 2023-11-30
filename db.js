const Sequelize = require('sequelize');

const sequelize = new Sequelize('demo', ' ', '', {
    dialect: 'mssql',
    host: '[HOSTNAME]',
    dialectOptions: {
        encrypt: true
    }
});
sequelize.authenticate().then((err) => {
    console.log('Connection successful', err);
})
.catch((err) => {
    console.log('Unable to connect to database', err);
});