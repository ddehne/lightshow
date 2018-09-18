// We need this to build our post string
var querystring = require('querystring');
var http = require('http');

function putColor(light, color, transitiontime) {
  let appliedTransitionTime = transitiontime ? transitiontime : 0;
  // Build the post string from an object
  var put_data = `{
    "on":true, 
    "transitiontime":${appliedTransitionTime},
    "sat":254, 
    "bri":254,
    "hue": ${color}}
    `;
  // 37073

  // An object of options to indicate where to post to
  var put_options = {
    host: '192.168.0.2',
    port: 80,
    path: `/api/H4zsxdcwhhRMMzmGLTTP0vAQ0ydRWR0RuBAuBinC/lights/${light}/state`,
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'    }
  };

  // Set up the request
  var put_req = http.request(put_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
      });
  });
  
  put_req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // post the data
  put_req.write(put_data);
  put_req.end();

}

function getRandomInt() {
  let min = Math.ceil(0);
  let max = Math.floor(65535);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let beatPerMinute = 114/2
// let measuresPerMinute = 114/2
let beatsPersecond = beatPerMinute/60
function logNextBeat(i) {
    let timeTilNextMeasure = beatsPersecond * 4
    console.log(timeTilNextMeasure);
    setTimeout(() => {
        console.log('Infinite Loop Test n:', i);
        runAFunkyPattern(timeTilNextMeasure)
        logNextBeat(++i);
    }, timeTilNextMeasure * 4000)
}

function runAFunkyPattern(timeTilNextMeasure){
  if(getRandomInt() > 10000){
    flow(timeTilNextMeasure);  
  } else {
    bounce(timeTilNextMeasure);
  }
}

function flow(timeTilNextMeasure) {
  let nexTime = Math.floor(timeTilNextMeasure)
  console.log(nexTime)
  let beatColor = getRandomInt();
  putColor(5, beatColor, nexTime);
  beatColor = getRandomInt();
  putColor(6, beatColor, nexTime);
  beatColor = getRandomInt();
  putColor(1, beatColor, nexTime);
}

function bounce(timeTilNextMeasure) {
  let nexTime = timeTilNextMeasure *1000

  let beatColor = getRandomInt();
  putColor(5, beatColor);
  putColor(6, beatColor);
  putColor(1, beatColor);

  setTimeout(() => {
      let beatColor = getRandomInt();
      putColor(5, beatColor);
      putColor(6, beatColor);
      putColor(1, beatColor);
    }, nexTime/4)

  setTimeout(() => {
      let beatColor = getRandomInt();
      putColor(5, beatColor);
      putColor(6, beatColor);
      putColor(1, beatColor);
    }, nexTime/2)

  setTimeout(() => {
      let beatColor = getRandomInt();
      putColor(5, beatColor);
      putColor(6, beatColor);
      putColor(1, beatColor);
    }, nexTime/4*3)

}

logNextBeat(0);

let i = 0;

