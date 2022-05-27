const votes = require('../db_apis/votes.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = Number(req.params.id);

    const rows = await votes.find(context);

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

function getVotesFromRec(req) {
  const vote = {
	Id:req.body.Id,
	PostId:req.body.PostId,
	UserId:req.body.UserId,
    BountyAmount:req.body.BountyAmount,
    VoteTypeId:req.body.VoteTypeId,
    CreationDate:req.body.CreationDate
  };

  return vote;
}

async function post(req, res, next) {
  try {
    let vote = getVotesFromRec(req);

    vote = await votes.create(vote);

    res.status(201).json(vote);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let vote = getVotesFromRec(req);

    vote.Id = req.params.id;

    vote = await votes.update(vote);

    if (vote !== null) {
      res.status(200).json(vote);
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

    const success = await votes.delete(id);

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