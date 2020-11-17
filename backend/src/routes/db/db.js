const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
host: 'brqkbwrblcwzhglres7n-mysql.services.clever-cloud.com',
user:'ud6vrwablkbct8cj',
password:'rWkjR6LAkf2SZlxUm3ed',
database: 'brqkbwrblcwzhglres7n',
multiStatements: true
});

mysqlConnection.connect(function (err){
  if(err){
    console.log(err);
  }else{
    console.log('La base de datos está conectada')
  }
});

module.exports =  mysqlConnection;