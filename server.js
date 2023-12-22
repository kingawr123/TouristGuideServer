var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();


app.use(bodyParser.json());
app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.get('/', function (req, res) {
   res.send('Hello World');
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Serwer działa na porcie ${PORT}`);
});