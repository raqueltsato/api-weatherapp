const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require('cors');


const app = express();



//app.use(require('./routes'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./controllers/userController')(app);
require('./controllers/weatherApp')(app);

app.listen(3330);

