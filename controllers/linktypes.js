const linktypes = require('../db_apis/linktypes.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = Number(req.params.id);

    const rows = await linktypes.find(context);

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

function getLinkTypesFromRec(req) {
  const linkType = {
	Id:req.body.Id,
	Type:req.body.Type
  };

  return linkType;
}

async function post(req, res, next) {
  try {
    let linkType = getLinkTypesFromRec(req);

    linkType = await linktypes.create(linkType);

    res.status(201).json(linkType);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let linkType = getLinkTypesFromRec(req);

    linkType.Id = req.params.id;

    linkType = await linktypes.update(linkType);

    if (linkType !== null) {
      res.status(200).json(linkType);
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

    const success = await linktypes.delete(id);

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