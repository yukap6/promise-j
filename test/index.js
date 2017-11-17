const Promise = require('../index');

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('hello promise');
    resolve('fulfilled');
    // reject('rejected');
  }, 100);
});

p.then((data) => {
  console.log('success', data);
}, (error) => {
  console.log('error', error);
}).then((data) => {
  console.log('success1', data);
}, (error) => {
  console.log('error1', error);
});
