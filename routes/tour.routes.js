module.exports = app => {
    const tours = require('../controllers/tour.controller.js');
    
    var router = require('express').Router();
    
    router.post('/', tours.create);
    
    router.get('/', tours.findAll);
    
    router.get('/:id', tours.findOne);

    router.get('/:id/rating', tours.findTourRating);
    
    router.put('/:id', tours.update);
    
    router.delete('/:id', tours.delete);
    
    app.use('/api/tours', router);
}