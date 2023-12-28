var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models');
const cookieSession = require('cookie-session');

const Role = db.role;

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

app.use(
   cookieSession({
      name: 'tourist-guide-session',
      keys: ['key1', 'key2'],
      httpOnly: true, 
   })
)

app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.get('/', (req, res) => {
   return res.send('Hello World');
})

require('./routes/tour.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Serwer działa na porcie ${PORT}`);
});

function initial() {
   Role.estimatedDocumentCount((err, count) => {
     if (!err && count === 0) {
       new Role({
         name: "user"
       }).save(err => {
         if (err) {
           console.log("error", err);
         }
 
         console.log("added 'user' to roles collection");
       });
 
       new Role({
         name: "moderator"
       }).save(err => {
         if (err) {
           console.log("error", err);
         }
 
         console.log("added 'moderator' to roles collection");
       });
 
       new Role({
         name: "admin"
       }).save(err => {
         if (err) {
           console.log("error", err);
         }
 
         console.log("added 'admin' to roles collection");
       });
     }
   });
 }