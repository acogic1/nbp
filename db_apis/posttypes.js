const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery = 
 `select Id "Id",
	Type "Type"
  from posttypes`;

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
 `insert into posttypes(
    Id,
    Type
)values(
    :Id,
	:Type 
)`;
	
async function create(emp) {
  const postType = Object.assign({}, emp);
  
  const result = await database.simpleExecute(createSql, postType);

  return postType;
}

module.exports.create = create;

const updateSql =
 `update posttypes
  set 
	Type=:Type
  where Id = :Id`;

async function update(emp) {
  const postType = Object.assign({}, emp);
  //console.log(updateSql)
  //console.log(postType)
  const result = await database.simpleExecute(updateSql, postType);

  if (result.rowsAffected === 1) {
    return postType;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin

    delete from posttypes
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