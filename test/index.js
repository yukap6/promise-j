const Promise = require('../index');

var p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('fn run finished');
  }, 1000);
});
p.then((data) => {
  console.log('fulfilled: ' + data);
}, (err) => {
  console.log('rejected: ' + err);
}).then((data) => {
  console.log('fulfilled1: ' + data);
}, (err) => {
  console.log('rejected1: ' + err);
});
