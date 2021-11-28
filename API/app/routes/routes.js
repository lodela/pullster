module.exports = app => {

  const user    = require('../controllers/user.controller.js');
  const surveys = require('../controllers/survey.controller.js');
  const answers = require('../controllers/answer.controller.js');

  const router = require('express').Router();
        router.post('/user/', user.create);
        router.get ('/user/', user.findAll);
        router.get ('/user/Published', user.findAllPublished);
        router.get ('/user/:id', user.findOne);
        router.put ('/user/:id', user.update);
        router.delete('/user/:id', user.delete);
        router.delete('/user/', user.deleteAll);

        router.post('/inquiry', surveys.create);
        router.put('/inquiry/:id', surveys.update);
        router.get('/inquiry', surveys.findAll);
        router.get('/inquiry/:id', surveys.findOne);
        router.delete('/inquiry/:id', surveys.delete);

        router.get('/inquiryResult', answers.findAll);
        router.post('/inquiryResult', answers.create);
        router.get('/inquiryResult/:surveyId/:date/', answers.findByDate);
        router.get('/inquiryResult/:surveyId/:date/:userId', answers.findOne);


        router.post('/*', user.pageNotFound);

        app.use('/api', router);

}
