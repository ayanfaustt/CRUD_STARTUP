import sequelize from 'sequelize';
import mysql from 'mysql2';
import "dotenv/config.js";


const db = new sequelize('Startups','root',process.env.DB_PASS,{
    host:'localhost',
    dialect:'mysql',
})

db.authenticate().then(function (){
    console.log('conectado com sucesso!')
}).catch(function (err){
    console.log("falha ao conectar: "+err)
});



export default db;