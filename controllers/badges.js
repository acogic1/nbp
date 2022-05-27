const badges = require('../db_apis/badges.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = Number(req.params.id);

    const rows = await badges.find(context);

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

function getBadgeFromRec(req) {
  const badge = {
	Id:req.body.Id,
	Name:req.body.Name,
	UserId:req.body.UserId,
	Dates:req.body.Dates
  };

  return badge;
}

async function post(req, res, next) {
  try {
    let badge = getBadgeFromRec(req);

    badge = await badges.create(badge);

    res.status(201).json(badge);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let badge = getBadgeFromRec(req);

    badge.Id = req.params.id;

    badge = await badges.update(badge);

    if (badge !== null) {
      res.status(200).json(badge);
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

    const success = await badges.delete(id);

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