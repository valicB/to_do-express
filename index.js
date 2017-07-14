const express = require('express');
const app = express();

app.get('/', (req, res)=> {
  res.send('All good!')
});

app.listen(9090, function () {
  console.log('Express server app running on port 9090!');
});
