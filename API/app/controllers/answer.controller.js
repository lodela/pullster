const db = require('../models');
const Answer = db.answers;

exports.create = (req, res) =>{
  if (!req.body.surveyId || !req.body.userId) {
    res.status(400).send({message: 'Survey ID or User Id can not be empty!'});
    return;
  }
  const answer = new Answer({
    name: req.body.name,
    lastName: req.body.lastName,
    userId: req.body.userId,
    tags: req.body.tags,
    status: req.body.status,
    notes: req.body.notes,
    wrong: req.body.wrong,
    date: req.body.date,
    surveyId: req.body.surveyId
  });
  answer.save(answer)
    .then(data => res.status(200).send({message:'OK'}))
    .catch(err => {
      res.status(500).send({message: err.message || 'An error ocurred...'})
    });
}

exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title : {$regex: new RegExp(title), $options : 'i'}} : {};
  Answer.find(condition).then(data => res.send(data)).catch(err => {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving users'
    });
  });
}

exports.findOne = (req, res) => {
  if (!req.params.surveyId) {
    res.status(400).send({message: 'Survey ID can not be empty!'});
    return;
  }
  const condition = {surveyId: req.params.surveyId, date: req.params.date, userId: req.params.userId};
  Answer.find(condition).then(data => {
    if(true === !!data.length){
      res.status(200).send({message:'Yes', data});
    }
    else{
      res.status(200).send({message:'Not found'});
    }
  }).catch(err => { res.status(500).send({message: err.message}) });
}

exports.findByDate = (req, res) => {}

exports.update = (req, res) => {}

exports.delete = (req, res) => {}
