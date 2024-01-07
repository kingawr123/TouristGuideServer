module.exports = app => {
    const tours = require('../controllers/tour.controller.js');
    
    var router = require('express').Router();
    
    router.post('/', tours.create);
    
    router.get('/', tours.findAll);
    
    router.get('/:id', tours.findOne);

    router.get('/:id/rating', tours.findTourRating);

    router.get('/:id/reviews', tours.findTourReservations);

    // działa
    router.get('/:id/reservations', tours.findTourReservations);

    router.get('/:id/reservationsinfo', tours.findTourReservationsInfo);

    // nie działa
    router.get('/reservedspots', tours.getToursNumberOfReservedSpots);
    
    router.put('/:id', tours.update);
    
    router.delete('/:id', tours.delete);
    
    app.use('/api/tours', router);
}