const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery = 
 `select Id "Id",
    CreationDate "CreationDate",
    PostId "PostId",
    Score "Score",
    Text "Text",
    UserId "UserId"
  from comments`;

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
 `insert into comments(
    Id,
    CreationDate,
    PostId,
    Score,
    Text,
    UserId
)values(
    :Id,
   :CreationDate,
   :PostId,
   :Score,
   :Text,
   :UserId
)`;
	
async function create(emp) {
  const comment = Object.assign({}, emp);
  
  const result = await database.simpleExecute(createSql, comment);

  return comment;
}

module.exports.create = create;

const updateSql =
 `update comments
  set 
  CreationDate=:CreationDate,
   PostId=:PostId,
   Score=:Score,
   Text=:Text,
   UserId=:UserId
  where Id = :Id`;

async function update(emp) {
  const comment = Object.assign({}, emp);
  console.log(updateSql)
  console.log(comment)
  const result = await database.simpleExecute(updateSql, comment);

  if (result.rowsAffected === 1) {
    return comment;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin

    delete from comments
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