var express = require('express');
var app = express();
var fs = require('fs');
app.get('/*', function (req, res) {
    console.log(req.path)
    var fileContents;
    try {
     
      if(req.path && req.path.indexOf('search')!=-1){
        console.log("search")
        busqueda = req.path.split('search/')
        respuesta=[]
        allFile=fs.readFileSync('./api/all.json')
        allJson=JSON.parse(allFile)

        allJson.forEach(superHeroe => {
          
          if(superHeroe.name.toLowerCase().indexOf(busqueda[1].toLowerCase())!=-1){
            console.log("superHeroe")
            console.log(superHeroe.name)
            console.log("busqueda")
            console.log(busqueda)

            respuesta.push(superHeroe)
          }
        });
        res.status(200).json(respuesta)
      }
      else{

        fileContents = fs.readFileSync('./api'+req.path+'.json');
        res.status(200).json(JSON.parse(fileContents))
      }
    } catch (err) {
      // Here you get the error when the file was not found,
      // but you also get any other error
      res.status(500).json({err:'Problema'})
      console.log(err)
    }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});