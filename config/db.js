const Sequelize = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize('TICKET_DATA','tplus', 'Ltc!TPus03#', {
	host: '10.30.3.240',
	dialect: 'mssql',
	dialectOptions: {
        userUTC:true,
        options:{
            "encrypt":false
        }
	},
	logging: false,
});

// Test the connection to the database
sequelize.authenticate()
	.then(() => {
		console.log('Connected to SqlServer database!');
	})
	.catch((err) => {
		console.error('Error connecting to MySQL database: ', err);
	});
    sequelize.sync();

module.exports = sequelize;

// const { Connection, Request } = require('tedious');

// function connectToDatabase() {
//   return new Promise((resolve, reject) => {
//     const connection = new Connection({
//       userName: 'tplus',
//       password: 'Ltc!TPus03#',
//       server: '10.30.3.240',
//       options: { encrypt: false }
//     });

//     connection.connect((err) => {
//       if (err) {
//         console.error('Error connecting to the database:', err);
//         reject(err);
//       } else {
//         console.log('Connected to the database!');
//         resolve(connection);
//       }
//     });

//     connection.on('end', () => {
//       console.log('Connection closed.');
//     });
//   });
// }

// module.exports = connectToDatabase;
