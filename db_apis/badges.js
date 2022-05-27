const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery = 
 `select Id "Id",
	Name "Name",
	UserId "UserId",
	Dates "Dates"
  from badges`;

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
 `insert into badges(
    Id,
    Name,
	UserId,
	Dates
)values(
    :Id,
	:Name,
	:UserId,
	:Dates	
)`;
	
async function create(emp) {
  const badge = Object.assign({}, emp);
  
  const result = await database.simpleExecute(createSql, badge);

  return badge;
}

module.exports.create = create;

const updateSql =
 `update badges
  set 
	Name=:Name,
	UserId=:UserId,
	Dates=:Dates
  where Id = :Id`;

async function update(emp) {
  const badge = Object.assign({}, emp);
  //console.log(updateSql)
  //console.log(badge)
  const result = await database.simpleExecute(updateSql, badge);

  if (result.rowsAffected === 1) {
    return badge;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin

    delete from badges
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