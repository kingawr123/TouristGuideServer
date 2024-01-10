const { ObjectId } = require('mongodb');
const db = require('../models');
const HistoryItem = db.history;

exports.create = (req, res) => {
    if (!req.body.tourId) {
        return res.status(400).json({ msg: 'Id wycieczki nie może być puste' });
    }

    if (!req.body.name) {
        return res.status(400).json({ msg: 'Nazwa nie może być pusta' });
    }

    if (!req.body.description) {
        return res.status(400).json({ msg: 'Opis nie może być pusty' });
    }

    if (!req.body.destination) {
        return res.status(400).json({ msg: 'Miejsce docelowe nie może być puste' });
    }

    if (!req.body.price) {
        return res.status(400).json({ msg: 'Cena nie może być pusta' });
    }

    if (!req.body.startDate) {
        return res.status(400).json({ msg: 'Data rozpoczęcia nie może być pusta' });
    }

    if (!req.body.endDate) {
        return res.status(400).json({ msg: 'Data zakończenia nie może być pusta' });
    }

    if (!req.body.imageUrl) {
        return res.status(400).json({ msg: 'Adres obrazka nie może być pusty' });
    }

    if (!req.body.reservedSpots) {
        return res.status(400).json({ msg: 'Zarezerwowane miejsca nie mogą być puste' });
    }

    if (!req.body.totalPrice) {
        return res.status(400).json({ msg: 'Całkowita cena nie może być pusta' });
    }

    if (!req.body.boughtDate) {
        return res.status(400).json({ msg: 'Data zakupu nie może być pusta' });
    }

    const historyItem = new HistoryItem({
        tourId: req.body.tourId,
        name: req.body.name,
        description: req.body.description,
        destination: req.body.destination,
        price: req.body.price,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        imageUrl: req.body.imageUrl,
        reservedSpots: req.body.reservedSpots,
        totalPrice: req.body.totalPrice,
        boughtDate: req.body.boughtDate
    });

    historyItem.save(historyItem)
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}

exports.findAll = (req, res) => {
    HistoryItem.find({})
        .then(historyItems => {
            return res.json(historyItems);
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}
