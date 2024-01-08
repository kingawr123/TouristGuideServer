const {ObjectId} = require('mongodb');
const db = require('../models');
const Reservation = db.reservations;

// get all reservations for user
exports.findAll = (req, res) => {
    Reservation.find({userId: req.params.id})
        .then(reservations => {
            return res.json(reservations);
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}


exports.create = (req, res) => {
    var id = req.params.id;
    id = new ObjectId(id);
    if (!req.body.userId) {
        return res.status(400).json({ msg: 'Brak id użytkownika' });
    }

    if (!req.body.totalPrice) {
        return res.status(400).json({ msg: 'Brak ceny' });
    }

    if (!req.body.reservedSpots) {
        return res.status(400).json({ msg: 'Brak ilości miejsc' });
    }

    const reservation = new Reservation({
        userId: req.body.userId,
        tourId: id,
        totalPrice: req.body.totalPrice,
        reservedSpots: req.body.reservedSpots,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });

    reservation.save(reservation)
        .then(data => {
            return res.json(data);
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}

exports.update = (req, res) => {
    var id = req.params.id;
    id = new ObjectId(id);

    if (!req.body.totalPrice) {
        return res.status(400).json({ msg: 'Brak ceny' });
    }

    if (!req.body.reservedSpots) {
        return res.status(400).json({ msg: 'Brak ilości miejsc' });
    }

    Reservation.updateOne({_id: id}, {
        totalPrice: req.body.totalPrice,
        reservedSpots: req.body.reservedSpots,
        updatedAt: Date.now()
    })
        .then(data => {
            if (!data) {
                return res.status(404).json({ msg: 'Nie znaleziono rezerwacji o podanym id' });
            }
            return res.json(data);
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}

exports.delete = (req, res) => {
    var id = req.params.id;
    id = new ObjectId(id);

    Reservation.findOneAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ msg: 'Nie znaleziono rezerwacji o podanym id' });
            }
            return res.json({ msg: 'Rezerwacja została usunięta' });
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}