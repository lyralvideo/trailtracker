const express = require('express');
var index_router = require('./routes/index');
var cors = require('cors');
const app = express();


app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
  

app.use('/', index_router);
app.listen(4000, () => {console.log('listening on port 4000');})