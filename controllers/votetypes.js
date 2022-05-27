const votetypes = require('../db_apis/votetypes.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = Number(req.params.id);

    const rows = await votetypes.find(context);

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

function getVoteTypesFromRec(req) {
  const voteType = {
	Id:req.body.Id,
	Name:req.body.Name
  };

  return voteType;
}

async function post(req, res, next) {
  try {
    let voteType = getVoteTypesFromRec(req);

    voteType = await votetypes.create(voteType);

    res.status(201).json(voteType);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let voteType = getVoteTypesFromRec(req);

    voteType.Id = req.params.id;

    voteType = await votetypes.update(voteType);

    if (voteType !== null) {
      res.status(200).json(voteType);
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

    const success = await votetypes.delete(id);

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