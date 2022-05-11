var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/home.html'));
});

/* GET listing page. */
router.get('/catalog', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/listing.html'));
});

/* GET product creation page */
router.get('/new-product', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/new-product.html'));
});

/* GET product details page. */
router.get('/product', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/product.html'));
});

/* GET search page. */
router.get('/search', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/search.html'));
});

const process = require('process');
const fs = require('fs');
const rdl = require('readline');
const std = process.stdout;
const colors = {
  'yellow': [33, 89],
  'blue': [34, 89],
  'green': [32, 89]
};

const spinners = JSON.parse(fs.readFileSync('./spinners.json').toString());


class Spinner {
  constructor() {
    this.timer = null;
    this.colorTxt = {
      start: '',
      stop: ''
    };
  }

  spin(spinnerName) {
    process.stdout.write('\x1B[?25l');
    const spin = spinners[spinnerName];
    const spinnerFrames = spin.frames;
    const spinnerTimeInterval = spin.interval;
    let index = 0;
    this.timer = setInterval(() => {
      let now = spinnerFrames[index];
      if (now == undefined) {
        index = 0;
        now = spinnerFrames[index];
      }
      std.write(this.colorTxt.start + now + this.colorTxt.stop);
      rdl.cursorTo(std, 0, 0);
      index = index >= spinnerFrames.length ? 0 : index + 1;
    }, spinnerTimeInterval);

  }

  color(colorName) {
    colorName = colors[colorName];
    this.setColor(colorName);
    return this;
  }

  setColor(colorName) {
    this.colorTxt.start = '\x1b[' + colorName[0] + 'm';
    this.colorTxt.stop = '\x1b[' + colorName[1] + 'm\x1b[0m';
  }
}

new Spinner().color('yellow').spin('line');
module.exports = router;
