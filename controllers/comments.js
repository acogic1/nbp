const comments = require('../db_apis/comments.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = Number(req.params.id);

    const rows = await comments.find(context);

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

function getCommentsFromRec(req) {
  const comment = {
	Id:req.body.Id,
	CreationDate:req.body.CreationDate,
    PostId:req.body.PostId,
    Score:req.body.Score,
    Text:req.body.Text,
    UserId:req.body.UserId
  };

  return comment;
}

async function post(req, res, next) {
  try {
    let comment = getCommentsFromRec(req);

    comment = await comments.create(comment);

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let comment = getCommentsFromRec(req);

    comment.Id = req.params.id;

    comment = await comments.update(comment);

    if (comment !== null) {
      res.status(200).json(comment);
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

    const success = await comments.delete(id);

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