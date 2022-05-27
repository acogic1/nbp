const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery = 
 `select Id "Id",
    AcceptedAnswerId "AcceptedAnswerId",
    AnswerCount "AnswerCount",
	Body "Body",
	ClosedDate "ClosedDate",
	CommentCount "CommentCount",
	CommunityOwnedDate "CommunityOwnedDate",
    CreationDate "CreationDate",
    FavoriteCount "FavoriteCount",
    LastActivityDate "LastActivityDate",
    LastEditDate "LastEditDate",
    LastEditorDisplayName "LastEditorDisplayName",
    LastEditorUserId "LastEditorUserId",
    OwnerUserId "OwnerUserId",
	ParentId "ParentId",
	PostTypeId "PostTypeId",
	Score "Score",
    Tags "Tags",
	Title "Title",
	ViewCount "ViewCount"
  from posts`;

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
 `insert into posts(
    Id,
    AcceptedAnswerId,
    AnswerCount,
	Body,
	ClosedDate,
	CommentCount,
	CommunityOwnedDate,
    CreationDate,
    FavoriteCount,
    LastActivityDate,
    LastEditDate,
    LastEditorDisplayName,
    LastEditorUserId,
    OwnerUserId,
	ParentId,
	PostTypeId,
	Score,
    Tags,
	Title,
	ViewCount
)values(
    :Id,
	:AcceptedAnswerId,
    :AnswerCount,
	:Body,
	:ClosedDate,
	:CommentCount,
	:CommunityOwnedDate,
    :CreationDate,
    :FavoriteCount,
    :LastActivityDate,
    :LastEditDate,
    :LastEditorDisplayName,
    :LastEditorUserId,
    :OwnerUserId,
	:ParentId,
	:PostTypeId,
	:Score,
    :Tags,
	:Title,
	:ViewCount
)`;
	
async function create(emp) {
  const post = Object.assign({}, emp);
  
  const result = await database.simpleExecute(createSql, post);

  return post;
}

module.exports.create = create;

const updateSql =
 `update posts
  set 
	AcceptedAnswerId=:AcceptedAnswerId,
    AnswerCount=:AnswerCount,
	Body=:Body,
	ClosedDate=:ClosedDate,
	CommentCount=:CommentCount,
	CommunityOwnedDate=:CommunityOwnedDate,
    CreationDate=:CreationDate,
    FavoriteCount=:FavoriteCount,
    LastActivityDate=:LastActivityDate,
    LastEditDate=:LastEditDate,
    LastEditorDisplayName=:LastEditorDisplayName,
    LastEditorUserId=:LastEditorUserId,
    OwnerUserId=:OwnerUserId,
	ParentId=:ParentId,
	PostTypeId=:PostTypeId,
	Score=:Score,
    Tags=:Tags,
	Title=:Title,
	ViewCount=:ViewCount
  where Id = :Id`;

async function update(emp) {
  const post = Object.assign({}, emp);
  //console.log(updateSql)
  //console.log(post)
  const result = await database.simpleExecute(updateSql, post);

  if (result.rowsAffected === 1) {
    return post;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin

    delete from posts
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