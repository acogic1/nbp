const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');

try {
    oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_21_3'});
  } catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
  }

async function initialize() {
  //const pool = await oracledb.createPool(dbConfig.hrPool);
  try{
   connection = await oracledb.getConnection({
        user : 'nbp',
        password : 'etfnbp',
        connectString : 'ora-02.db.lab.etf.unsa.ba:1521/cdb1'
   });
   console.log("Successfully connected to Oracle!")
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
}

module.exports.initialize = initialize;

async function close() {
  await oracledb.getConnection().close();
}

module.exports.close = close;

function simpleExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
		console.log('prije konekcije')
      conn = await oracledb.getConnection({
        user : 'nbp',
        password : 'etfnbp',
        connectString : 'ora-02.db.lab.etf.unsa.ba:1521/cdb1'
   });
console.log('poslije konekcije')
      const result = await conn.execute(statement,binds,opts);
		
      resolve(result);
    } catch (err) {
		console.log(statement)
		console.log(binds)
		console.log(opts)
		console.log('catch');
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

module.exports.simpleExecute = simpleExecute;