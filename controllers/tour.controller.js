const { ObjectId } = require("mongodb");
const db = require("../models");
const Tour = db.tours;

exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ msg: 'Nazwa nie może być pusta' });
    }
    
    const tour = new Tour({
        name: req.body.name,
        description: req.body.description,
        destination: req.body.destination,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        price: req.body.price,
        maxPeople: req.body.maxPeople,
        imageUrl: req.body.imageUrl,
    });
    
    tour.save(tour)
        .then(data => {
            return res.json(data);
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
    }

exports.findAll = (req, res) => {  
    Tour.find()
        .then(tours => {
            return res.json(tours);
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Tour.findById(id)
        .then(tour => {
            if (!tour) {
                return res.status(404).json({ msg: 'Nie znaleziono wycieczki o podanym id' });
            }
            return res.json(tour);
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ msg: 'Brak danych do aktualizacji' });
    }
    
    const id = req.params.id;
    
    Tour.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(tour => {
            if (!tour) {
                return res.status(404).json({ msg: 'Nie znaleziono wycieczki o podanym id' });
            }
            return res.json({ msg: 'Wycieczka została zaktualizowana' });
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    id: ObjectId = ObjectId(id);
    
    Tour.findOneAndDelete(id)
        .then(tour => {
            if (!tour) {
                return res.status(404).json({ msg: 'Nie znaleziono wycieczki o podanym id' });
            }
            return res.json({ msg: 'Wycieczka została usunięta' });
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}
