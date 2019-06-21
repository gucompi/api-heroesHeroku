var express = require('express');
var app = express();
var fs = require('fs');
app.get('/*', function (req, res) {
    console.log(req.path)
    fs.readFile('./api'+req.path+'.json',(err,data)=>{
        if(err)  res.send(err);
        res.send(JSON.parse(data))
    })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});