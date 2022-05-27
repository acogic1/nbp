const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery = 
 `select Id "Id",
	Name "Name"
  from votetypes`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.id = context.id

    query += `\nwhere Id = :Id`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const createSql = 
 `insert into votetypes(
    Id,
    Name
)values(
    :Id,
	:Name 
)`;
	
async function create(emp) {
  const voteType = Object.assign({}, emp);
  
  const result = await database.simpleExecute(createSql, voteType);

  return voteType;
}

module.exports.create = create;

const updateSql =
 `update votetypes
  set 
	Name=:Name
  where Id = :Id`;

async function update(emp) {
  const voteType = Object.assign({}, emp);
  //console.log(updateSql)
  //console.log(voteType)
  const result = await database.simpleExecute(updateSql, voteType);

  if (result.rowsAffected === 1) {
    return voteType;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin

    delete from votetypes
    where Id = :Id;

    :rowcount := sql%rowcount;

  end;`

async function del(id) {
  const binds = {
    Id: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;