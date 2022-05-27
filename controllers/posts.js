const posts = require('../db_apis/posts.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = Number(req.params.id);

    const rows = await posts.find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;

function getPostsFromRec(req) {
  const postt = {
	Id:req.body.Id,
	AcceptedAnswerId:req.body.AcceptedAnswerId,
    AnswerCount:req.body.AnswerCount,
	Body:req.body.Body,
	ClosedDate:req.body.ClosedDate,
	CommentCount:req.body.CommentCount,
	CommunityOwnedDate:req.body.CommunityOwnedDate,
    CreationDate:req.body.CreationDate,
    FavoriteCount:req.body.FavoriteCount,
    LastActivityDate:req.body.LastActivityDate,
    LastEditDate:req.body.LastEditDate,
    LastEditorDisplayName:req.body.LastEditorDisplayName,
    LastEditorUserId:req.body.LastEditorUserId,
    OwnerUserId:req.body.OwnerUserId,
	ParentId:req.body.ParentId,
	PostTypeId:req.body.PostTypeId,
	Score:req.body.Score,
    Tags:req.body.Tags,
	Title:req.body.Title,
	ViewCount:req.body.ViewCount
  };

  return postt;
}

async function post(req, res, next) {
  try {
    let postt = getPostsFromRec(req);

    postt = await posts.create(postt);

    res.status(201).json(postt);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let postt = getPostsFromRec(req);

    postt.Id = req.params.id;

    postt = await posts.update(postt);

    if (postt !== null) {
      res.status(200).json(postt);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.put = put;

async function del(req, res, next) {
  try {
    const id = req.params.id;

    const success = await posts.delete(id);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.delete = del;