import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.host || ''
const userdb = process.env.user || 'root'
const password_db = process.env.password || ''
const database = process.env.database || ''
const portdb = process.env.db_port || 3306

const connection = mysql2.createConnection({
    host: host,
    user: userdb,
    password:password_db,
    database: database,
    port: portdb
});

connection.connect((err)=>{
    if(err) throw err;
    console.log("Connect to MySQL")
});

//metodos

//insert
export function insert(data, callback){
    let insertQuery = `INSERT INTO controlIngreso values (0,'${data._id}','${data.fecha}')`;
    connection.query(insertQuery, (err, result)=>{
        if(err) throw err;
        callback(result);
        //connection.end(); 
    });
}
//get
export function read(callback){
    let readQuery = `select * from controlIngreso`;
    connection.query(readQuery, (err, result)=>{
        if(err) throw err;
        callback(result);
        //connection.end();  
    });
}