// We need this to build our post string
var querystring = require('querystring');
var http = require('http');

function putColor(light, transitiontime = 0, colorStats) {
  // Build the post string from an object
    const putData = {
      on: true, 
      transitiontime: transitiontime,
      sat: colorStats.sat || 254, 
      bri: colorStats.bri || 254,
      hue: colorStats.hue || 0
    }

  // An object of options to indicate where to post to
  const currentHueLocation = '192.168.0.53'
  var put_options = {
    host: currentHueLocation,
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
  put_req.write(JSON.stringify(putData));
  put_req.end();

}



const deskLampId = 14
const bookLampId = 13

const gradientStripId = 15
const extendedColorLightId = 16


const brightRed = {
  bri: 254,
  hue: 128,
  sat: 254,
}

const lowOrange = {
  bri: 110,
  hue: 2361,
  sat: 254,
}

const babyBlue = {
  bri: 254,
  hue: 41017,
  sat: 254,
}

const startHellFireShow = (lightId) => {
  putColor(lightId, 30, brightRed);
  setTimeout(() => {
    putColor(lightId, 30, lowOrange);
    setTimeout(() => startHellFireShow(lightId), 4000)
  }, 4000)
}

const brightWhite = {
  bri: 254,
  hue: 40792,
  sat: 77,
}

const darkWhite = {
  bri: 10,
  hue: 41831,
  sat: 73,
}

const phantomPurple = {
  bri: 128,
  hue: 49345,
  sat: 251,
}
const startLightning = (lightId) => {
  putColor(lightId, 0, brightWhite);
  putColor(lightId, 0, darkWhite);
  putColor(lightId, 0, brightWhite);
  putColor(lightId, 0, darkWhite);
  putColor(lightId, 0, brightWhite);
  putColor(lightId, 0, darkWhite);
  
  setTimeout(() => {
    putColor(lightId, 0, brightWhite);
    putColor(lightId, 20, darkWhite);
  }, 900)
}

const startPhantomShow = (lightId) => {
  startLightning(lightId)
  setTimeout(() => {
    putColor(lightId, 10, phantomPurple);
  }, 2000)

  setTimeout(() => {
    startPhantomShow(lightId);
  }, 40000)
} 

startHellFireShow(extendedColorLightId)
startPhantomShow(gradientStripId)
// startPhantomShow(gradientStripId)
// startPhantomShow(12)
// startPhantomShow(11)
// startPhantomShow(15)
// startPhantomShow(16)






// function getRandomInt() {
//   let min = Math.ceil(0);
//   let max = Math.floor(65535);
//   return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
// }

// let beatPerMinute = 114/2
// // let measuresPerMinute = 114/2
// let beatsPersecond = beatPerMinute/60
// function logNextBeat(i) {
//     let timeTilNextMeasure = beatsPersecond * 4
//     console.log(timeTilNextMeasure);
//     setTimeout(() => {
//         console.log('Infinite Loop Test n:', i);
//         runAFunkyPattern(timeTilNextMeasure)
//         logNextBeat(++i);
//     }, timeTilNextMeasure * 4000)
// }

// function runAFunkyPattern(timeTilNextMeasure){
//   if(getRandomInt() > 10000){
//     flow(timeTilNextMeasure);  
//   } else {
//     bounce(timeTilNextMeasure);
//   }
// }

// function flow(timeTilNextMeasure) {
//   let nexTime = Math.floor(timeTilNextMeasure)
//   console.log(nexTime)
//   let beatColor = getRandomInt();
//   putColor(5, beatColor, nexTime);
//   beatColor = getRandomInt();
//   putColor(6, beatColor, nexTime);
//   beatColor = getRandomInt();
//   putColor(1, beatColor, nexTime);
// }

// function bounce(timeTilNextMeasure) {
//   let nexTime = timeTilNextMeasure *1000

//   let beatColor = getRandomInt();
//   putColor(5, beatColor);
//   putColor(6, beatColor);
//   putColor(1, beatColor);

//   setTimeout(() => {
//       let beatColor = getRandomInt();
//       putColor(5, beatColor);
//       putColor(6, beatColor);
//       putColor(1, beatColor);
//     }, nexTime/4)

//   setTimeout(() => {
//       let beatColor = getRandomInt();
//       putColor(5, beatColor);
//       putColor(6, beatColor);
//       putColor(1, beatColor);
//     }, nexTime/2)

//   setTimeout(() => {
//       let beatColor = getRandomInt();
//       putColor(5, beatColor);
//       putColor(6, beatColor);
//       putColor(1, beatColor);
//     }, nexTime/4*3)

// }

// logNextBeat(0);

// for(let i =0; i < 20; i++) {
//   console.log(i)
//   putColor(i, getRandomInt())
// }
// const rgb2xyb = (r,g,b) => {
//   const toPow = (c) => c > 0.04045 ? 2.4 : c/12.92
//   let r2 = ((r+0.055)/1.055) ** toPow(r)
//   let g2 = ((g+0.055)/1.055) ** toPow(g)
//   let b2 = ((b+0.055)/1.055) ** toPow(b)

//   const X = r2 * 0.4124 + g2 * 0.3576 + b2 * 0.1805
//   const Y = r2 * 0.2126 + g2 * 0.7152 + b2 * 0.0722
//   const Z = r2 * 0.0193 + g2 * 0.1192 + b2 * 0.9505

//   return {
//     h: X / (X + Y + Z),
//     s: Y / (X + Y + Z), 
//     b: Y*254
//   }
// }

