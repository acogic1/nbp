const posttypes = require('../db_apis/posttypes.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = Number(req.params.id);

    const rows = await posttypes.find(context);

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

function getPostTypesFromRec(req) {
  const postType = {
	Id:req.body.Id,
	Type:req.body.Type
  };

  return postType;
}

async function post(req, res, next) {
  try {
    let postType = getPostTypesFromRec(req);

    postType = await posttypes.create(postType);

    res.status(201).json(postType);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let postType = getPostTypesFromRec(req);

    postType.Id = req.params.id;

    postType = await posttypes.update(postType);

    if (postType !== null) {
      res.status(200).json(postType);
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

    const success = await posttypes.delete(id);

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