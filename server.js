let connection;
var oracledb = require('oracledb');

try {
    oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_21_3'});
  } catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
  }

(async function() {
try{
   connection = await oracledb.getConnection({
        user : 'nbp',
        password : 'etfnbp',
        connectString : 'ora-02.db.lab.etf.unsa.ba:1521/cdb1'
   });
   console.log("Successfully connected to Oracle!")
   connection.execute(
      `SELECT *
       FROM users`,
      [],  
     function(err, result) {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(result.rows);
     });
   getUsers();
} catch(err) {
    console.log("Error: ", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch(err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
  }
})()

const express = require('express');
const app = express();

//app.get('/users', (request, response) => {
function getUsers(){
    connection.execute(
      `SELECT *
       FROM users`,
      [],  
     function(err, result) {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(result.rows);
     });
}
//);
//getUsers();
app.listen(8080);

