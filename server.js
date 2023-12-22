

var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var mongoose = require('mongoose');
const { URL } = require('./config');

// const url = URL

const url = "mongodb+srv://kingawr123:hC72bOggfKtgTtMt@touristguide.2euyivj.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url, 
   { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
   }
);

const tourSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   description: String,
   price: Number,
   rating: Number
});

const Tour = mongoose.model('Tour', tourSchema);

const tour = new Tour({
   name: 'The Sea Explorer',
   description: 'Exploring the vast ocean blue',
   price: 497
});
tour.save()
   .then(doc => {
      console.log(doc);
   })
   .catch(err => {
      console.error(err);
   });

var app = express();

app.use(bodyParser.json());
app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.get('/', (req, res) => {
   return res.send('Hello World');
})

app.get('/tours', (req, res) => {
   Tour.find()
      .then(tours => {
         return res.json(tours);
      })
      .catch(err => {
         return res.status(500).json({ msg: 'Błąd serwera' });
      })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Serwer działa na porcie ${PORT}`);
});