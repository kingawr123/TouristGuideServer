module.exports = app => {
    const reservations = require('../controllers/reservation.controller.js');
    
    var router = require('express').Router();
    
    router.post('/:id', reservations.create);

    // działa reszta nie wiem
    router.get('/:id', reservations.findAll);
        
    router.put('/:id', reservations.update);
    
    router.delete('/:id', reservations.delete);
    
    app.use('/api/reservations', router);
}