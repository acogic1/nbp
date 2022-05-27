const database = require('../services/database.js');
const oracledb = require('oracledb');

/*try {
    oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_21_3'});
  } catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
  }*/

const baseQuery = 
 `select Id "Id",
    AboutMe "AboutMe",
    Age "Age",
    CreationDate "CreationDate",
    DisplayName "DisplayName",
    DownVotes "DownVotes",
    EmailHash "EmailHash",
    LastAccessDate "LastAccessDate",
    Location "Location",
    Reputation "Reputation",
    UpVotes "UpVotes",
	Views "Views",
	WebsiteUrl "WebsiteUrl",
	AccountId "AccountId"
  from users`;

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
 `insert into users(
    Id,
    AboutMe,
    Age,
    CreationDate,
    DisplayName,
    DownVotes,
    EmailHash,
    LastAccessDate,
    Location,
    Reputation,
    Upvotes,
    Views,
    WebsiteUrl,
    AccountId
)values(
    :Id,
   :AboutMe,
   :Age,
   :CreationDate,
   :DisplayName,
   :DownVotes,
   :EmailHash,
   :LastAccessDate,
   :Location,
   :Reputation,
   :Upvotes,
   :Views,
   :WebsiteUrl,
   :AccountId
)`;
	
async function create(emp) {
  const user = Object.assign({}, emp);

  /*user.Id =3103; /*{
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }*/
  
  const result = await database.simpleExecute(createSql, user);

  //user.Id = result.outBinds.Id[0];

  return user;
}

module.exports.create = create;

const updateSql =
 `update users
  set 
  AboutMe =:AboutMe,
    Age =:Age,
    CreationDate=:CreationDate,
    DisplayName=:DisplayName,
    DownVotes=:DownVotes,
    EmailHash=:EmailHash,
    LastAccessDate=:LastAccessDate,
    Location=:Location,
    Reputation=:Reputation,
    Upvotes=:Upvotes,
    Views=:Views,
    WebsiteUrl=:WebsiteUrl,
    AccountId=:AccountId
  where Id = :Id`;

async function update(emp) {
  const user = Object.assign({}, emp);
  console.log(updateSql)
  console.log(user)
  const result = await database.simpleExecute(updateSql, user);

  if (result.rowsAffected === 1) {
    return user;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin

    delete from users
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