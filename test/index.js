const Deferred = require('../index');

var deferred3 = new Deferred();
var p = new deferred3.Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('fn run finished');
  }, 1000);
});
p.then((data) => {
  console.log('fulfilled: ' + data);
  var deferred4 = new Deferred();
  return new deferred4.Promise((resolve, reject) => {
    setTimeout(() => {
      reject('promise2 and：dataOne = ' + data);
    }, 1000);
  });
}, (err) => {
  console.log('rejected: ' + err);
}).then((data) => {
  console.log('fulfilled1: ' + data);
}, (err) => {
  console.log('rejected1: ' + err);
}).then((data) => {
  console.log('fulfilled2: ' + data);
});
