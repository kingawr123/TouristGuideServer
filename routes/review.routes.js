module.exports = app => {
    const reviews = require('../controllers/review.controller.js');
    
    var router = require('express').Router();
    
    router.post('/:id', reviews.create);
        
    router.get('/:id', reviews.findAll);
    
    router.delete('/:id', reviews.delete);
    
    app.use('/api/reviews', router);
}