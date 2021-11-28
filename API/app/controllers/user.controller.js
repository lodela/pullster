const db = require('../models');
const User = db.users;

exports.create = (req, res) =>{
  if (!req.body.ID) {
    res.status(400).send({message: 'Id can not be empty'});
    return;
  }
  const user = new User({
    ID: req.body.ID,
    name: req.body.name,
    lastName: req.body.lastName,
    location: req.body.location,
    admin: req.body.admin
  });
  user.save(user)
      .then(data => res.status(200).send(data))
      .catch(err => {
        res.status(500).send({message: err.message || 'An error ocurred...'})
      });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name : {$regex: new RegExp(name), $options : 'i'}} : {};
  User.find(condition).then(data => res.send(data)).catch(err => {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving users'
    });
  });
};

exports.findOne = (req, res) => {
  const condition = { ID: req.params.id };
  User.find(condition).then(data => {res.status(200).send(data[0])}).catch(err => {
    res.status(500).send({message: err.message || `Some error occurred while retrieving user with id: ${id}`});
  });
}

exports.update = (req, res) => {
  if(!req.body){
    return res.status(400).send({message : 'Data to update can not be empty !!!'});
  }else{
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, {useFindAndModify : false}).then(data => {
      res.status(data ? 200 : 400).send({message : data ? 'User was Updated Usccessfuly' : `Cannot update User with id: ${id}. Perhaps, user does not exist.`})
    }).catch(err => {
      res.status(400).send({message : err.message || `Error while updating User with id: ${id}`});
    });
  }
}

exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id).then(data => {
    res.status(!data ? 400 : 200).send({message : data? 'User deleted successfully!' : `Could not delete User id: ${id}. Maybe user doesnot exist on DB.`});
  }).catch(err => {
    res.status(500).send({message : `Could not delete User with id: ${id}`})
  });
}

exports.deleteAll = (req, res) => {
  User.deleteMany({}).then(res.status(200).send({message: `${data.deletedCount} Users were deleted successfully!`})).catch(err => {
    res.status(500).send({message : 'Error occurred while delete all users...'});
  })
}

exports.findAllPublished = (req, res) => {
  User.find({published:true}).then(data => {
    res.status(200).send({data});
  }).catch(err => {
    res.status().send({message : err.message || 'Error! while finding all published'})
  })
}

exports.pageNotFound = (req, res) => {
  console.log('que pets....');
  res.status(404);
  req.accepts('html') ? res.render('404', {url: req.url}) : req.accepts('json') ? res.json({error:`404 page: ${req.url} Not Found`}) : res.type('txt').send('Page not found');
}
