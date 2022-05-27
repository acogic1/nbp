const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery = 
 `select Id "Id",
	PostId "PostId",
	UserId "UserId",
    BountyAmount "BountyAmount",
    VoteTypeId "VoteTypeId",
    CreationDate "CreationDate"
  from votes`;

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
 `insert into votes(
    Id,
    PostId,
	UserId,
    BountyAmount,
    VoteTypeId,
    CreationDate 
)values(
    :Id,
	:PostId,
	:UserId,
    :BountyAmount,
    :VoteTypeId,
    :CreationDate 
)`;
	
async function create(emp) {
  const vote = Object.assign({}, emp);
  
  const result = await database.simpleExecute(createSql, vote);

  return vote;
}

module.exports.create = create;

const updateSql =
 `update votes
  set 
	PostId=:PostId,
	UserId=:UserId,
    BountyAmount=:BountyAmount,
    VoteTypeId=:VoteTypeId,
    CreationDate=:CreationDate
  where Id = :Id`;

async function update(emp) {
  const vote = Object.assign({}, emp);
  //console.log(updateSql)
  //console.log(vote)
  const result = await database.simpleExecute(updateSql, vote);

  if (result.rowsAffected === 1) {
    return vote;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin

    delete from votes
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