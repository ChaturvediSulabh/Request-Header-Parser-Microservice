const express = require('express');
const app = express();
const useragent = require('express-useragent');
const request = require('request');
app.enable('trust proxy');
app.get('/', function(req, res){
    res.sendFile('default.html', { root: __dirname + "/client"} );
});
app.get('/api/whoami',function(req,res,next){
  let ip =req.ip;
  ip = ip.replace(/[a-zA-Z:]+/g,'')
  let sw = req.headers['user-agent'];
  sw = sw.match(/\(.*\)/g)[0].replace(/[()]/g,'').replace(/ Apple.*/g,'');
  let lang = req.headers['accept-language'];
  lang = lang.replace(/,.*/,'');
  const myObj = {}
  myObj.IPAddress = ip;
  myObj.Language = lang;
  myObj.Software = sw; 
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(myObj));
  next();
});
app.listen(process.env.PORT || 8080);
