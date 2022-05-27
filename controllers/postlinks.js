const postlinks = require('../db_apis/postlinks.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = Number(req.params.id);

    const rows = await postlinks.find(context);

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

function getPostsLinksFromRec(req) {
  const postLink = {
	Id:req.body.Id,
	CreationDate:req.body.CreationDate,
    PostId:req.body.PostId,
	RelatedPostId:req.body.RelatedPostId,
    LinkTypeId:req.body.LinkTypeId
  };

  return postLink;
}

async function post(req, res, next) {
  try {
    let postLink = getPostsLinksFromRec(req);

    postLink = await postlinks.create(postLink);

    res.status(201).json(postLink);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let postLink = getPostsLinksFromRec(req);

    postLink.Id = req.params.id;

    postLink = await postlinks.update(postLink);

    if (postLink !== null) {
      res.status(200).json(postLink);
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

    const success = await postlinks.delete(id);

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