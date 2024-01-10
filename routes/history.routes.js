module.exports = app => {
    const history = require('../controllers/history.controller.js');
    
    var router = require('express').Router();
    
    router.post('/', history.create);
        
    router.get('/', history.findAll);
    
    app.use('/api/history', router);
}