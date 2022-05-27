const database = require('../services/database.js');
const oracledb = require('oracledb');

const baseQuery = 
 `select Id "Id",
    CreationDate "CreationDate",
    PostId "PostId",
	RelatedPostId "RelatedPostId",
    LinkTypeId "LinkTypeId"
  from postlinks`;

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
 `insert into postlinks(
    Id,
    CreationDate,
    PostId,
	RelatedPostId,
    LinkTypeId 
)values(
    :Id,
   :CreationDate,
   :PostId,
   :RelatedPostId,
   :LinkTypeId
)`;
	
async function create(emp) {
  const postlink = Object.assign({}, emp);
  
  const result = await database.simpleExecute(createSql, postlink);

  return postlink;
}

module.exports.create = create;

const updateSql =
 `update postlinks
  set 
  CreationDate=:CreationDate,
   PostId=:PostId,
   RelatedPostId=:RelatedPostId,
   LinkTypeId=:LinkTypeId
  where Id = :Id`;

async function update(emp) {
  const postlink = Object.assign({}, emp);
  console.log(updateSql)
  console.log(postlink)
  const result = await database.simpleExecute(updateSql, postlink);

  if (result.rowsAffected === 1) {
    return postlink;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin

    delete from postlinks
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