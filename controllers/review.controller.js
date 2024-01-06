const { ObjectId } = require("mongodb");
const db = require("../models");
const Review = db.reviews;

exports.create = (req, res) => {
    var id = req.params.id;
    id = new ObjectId(id);
    if (!req.body.username) {
        return res.status(400).json({ msg: 'Nazwa nie może być pusta' });
    }

    if (!req.body.opinion || req.body.opinion.length > 500 || req.body.opinion.length < 10) {
        return res.status(400).json({ msg: 'Opinia ma złą długość' });
    }

    if (!req.body.rating) {
        return res.status(400).json({ msg: 'Ocena nie może być pusta' });
    }
    
    const review = new Review({
        username: req.body.username,
        opinion: req.body.opinion,
        rating: req.body.rating,
        tour: id
    });
    
    review.save(review)
        .then(data => {
            return res.json(data);
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
    }

exports.findAll = (req, res) => {
    var id = req.params.id;
    id = new ObjectId(id);  

    Review.find({tour: id})
        .then(reviews => {
            return res.json(reviews);
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Review.findById(id)
        .then(review => {
            if (!review) {
                return res.status(404).json({ msg: 'Nie znaleziono opini o podanym id' });
            }
            return res.json(review);
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
    
    Review.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(review => {
            if (!review) {
                return res.status(404).json({ msg: 'Nie znaleziono wycieczki o podanym id' });
            }
            return res.json({ msg: 'Opinia została zaktualizowana' });
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}

exports.delete = (req, res) => {
    var id = req.params.id;
    id = new ObjectId(id);
    
    Review.findOneAndDelete(id)
        .then(review => {
            if (!review) {
                return res.status(404).json({ msg: 'Nie znaleziono wycieczki o podanym id' });
            }
            return res.json({ msg: 'Opinia została usunięta' });
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Błąd serwera' });
        })
}
