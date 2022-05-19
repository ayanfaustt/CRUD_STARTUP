import mysql from 'mysql2';


async function connect () {
   const connection = await mysql.createConnection("mysql://root:af@localhost:3306/Startups");

   global.connection = connection;
}

connect();