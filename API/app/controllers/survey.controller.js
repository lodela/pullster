const db = require('../models');
const Survey = db.surveys;

exports.create = (req, res) =>{
  console.log(req.body);
  console.log(req.query);
  console.log('----------------------------');

  if (!req.body.title) {
    res.status(400).send({message: 'Survey Title can not be empty'});
    return;
  }
  const survey = new Survey({
    type: req.body.type,
    title: req.body.title,
    isDeleted: req.body.isDeleted,
    isAnonymous: req.body.isAnonymous,
    questions: req.body.questions,

    responses: req.body.responses,
    subtitle: req.body.subTitle,
    intro: req.body.intro,

    buttonText: req.body.buttonText,
    extraButton: req.body.extraButton ? req.body.extraButton : false,
    extraButtonText: req.body.extraButtonText ? req.body.extraButtonText : null,

    recipients: req.body.recipients
  });
  survey.save(survey)
      .then(data => res.status(200).send(data))
      .catch(err => {
        res.status(500).send({message: err.message || 'An error ocurred...'})
      });
}

exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title : {$regex: new RegExp(title), $options : 'i'}} : {};
  Survey.find(condition).then(data => res.send(data)).catch(err => {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving users'
    });
  });
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  Survey.findById(id).then(data => {
    res.status(data ? 200 : 400).send( data ? data : {message : `NOT Found.`})
  }).catch(err => {
    res.status(500).send({message: err.message || `Some error occurred while retrieving user with id: ${id}`});
  });
}

exports.update = (req, res) => {
  if(!req.body){
    return res.status(400).send({message : 'Data to update can not be empty !!!'});
  }else{
    const id = req.params.id;
    Survey.findByIdAndUpdate(id, req.body, {useFindAndModify : false}).then(data => {
      res.status(data ? 200 : 400).send({message : data ? 'Survey was Updated Usccessfuly' : `Cannot update Survey with id: ${id}. Perhaps, Survey does not exist.`})
    }).catch(err => {
      res.status(400).send({message : err.message || `Error while updating User with id: ${id}`});
    });
  }
}

exports.delete = (req, res) => {
  const id = req.params.id;
  Survey.findByIdAndRemove(id).then(data => {
    res.status(!data ? 400 : 200).send({message : data? 'Survey deleted successfully!' : `Could not delete Survey id: ${id}. Perhaps, Survey doesnot exist on DB.`});
  }).catch(err => {
    res.status(500).send({message : `Could not delete User with id: ${id}`})
  });
}

exports.deleteAll = (req, res) => {
  Survey.deleteMany({}).then(res.status(200).send({message: `${data.deletedCount} surveys were deleted successfully!`})).catch(err => {
    res.status(500).send({message : 'Error occurred while delete all surveys...'});
  })
}

exports.findAllPublished = (req, res) => {
  Survey.find({published:true}).then(data => {
    res.status(200).send({data});
  }).catch(err => {
    res.status().send({message : err.message || 'Error! while finding all published'})
  })
}
