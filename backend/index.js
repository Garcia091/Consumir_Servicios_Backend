const express = require ('express');
const app = express();
const path = require ('path');
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

const routes = require ('./src/routes/routes.js')
app.use('/api',routes);
app.use(express.urlencoded({extended: false}));

app.listen(3000,()=>{
  console.log('server started')
});