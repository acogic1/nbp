const users = require('../db_apis/users.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = Number(req.params.id);

    const rows = await users.find(context);

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

function getUsersFromRec(req) {
  const user = {
	Id:req.body.Id,
	AboutMe: req.body.AboutMe,
    Age: req.body.Age,
    CreationDate: req.body.CreationDate,
    DisplayName: req.body.DisplayName,
    DownVotes: req.body.DownVotes,
    EmailHash: req.body.EmailHash,
    LastAccessDate: req.body.LastAccessDate,
    Location: req.body.Location,
    Reputation: req.body.Reputation,
    UpVotes: req.body.UpVotes,
	Views: req.body.Views,
	WebsiteUrl: req.body.WebsiteUrl,
	AccountId: req.body.AccountId
  };

  return user;
}

async function post(req, res, next) {
  try {
    let user = getUsersFromRec(req);

    user = await users.create(user);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let user = getUsersFromRec(req);

    user.Id = req.params.id;

    user = await users.update(user);

    if (user !== null) {
      res.status(200).json(user);
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

    const success = await users.delete(id);

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