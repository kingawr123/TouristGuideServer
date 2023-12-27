var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models');

db.mongoose
   .connect(db.url, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
   })
   .then(() => {
      console.log("Połączono z bazą danych");
   })
   .catch(err => {
      console.error("Błąd połączenia z bazą danych", err);
      process.exit();
   });



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.get('/', (req, res) => {
   return res.send('Hello World');
})

require('./routes/tour.routs')(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Serwer działa na porcie ${PORT}`);
});