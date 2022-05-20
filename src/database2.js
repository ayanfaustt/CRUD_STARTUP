import mysql from 'mysql2';


const connection =  mysql.createConnection({
   host: 'localhost',
   user: 'root',
   database: 'Startups',
   password: '84A06a20-'
});



export default connection;