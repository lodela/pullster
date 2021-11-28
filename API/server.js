const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:4200'
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
   next();
});
const db = require('./app/models');
db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database Online...!');
}).catch(err => {
  console.error('Error!!!', err);
  process.exit();
})

app.get('/', (req, res) => {
  res.json({message: 'Welcome to Pullster API'});
});

require('./app/routes/routes.js')(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
