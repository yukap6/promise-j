function PromiseJ(fn) {
  const self = this;
  let status = 'pending';
  self.onFulfilled = null;
  self.onRejected = null;
  if (typeof fn !== 'function') {
    throw new Error('Param of promise constuctor must be a function');
  }
  function resolve(data) {
    if (status !== 'pending') {
      return;
    }
    status = 'fulfilled';
    setTimeout(() => {
      if (typeof self.onFulfilled === 'function') {
        self.onFulfilled(data);
      }
    }, 0);
  }
  function reject(data) {
    if (status !== 'pending') {
      return;
    }
    status = 'rejected';
    setTimeout(() => {
      if (typeof self.onRejected === 'function') {
        self.onRejected(data);
      }
    }, 0);
  }
  self.then = (onFulfilled, onRejected) => {
    self.onFulfilled = onFulfilled;
    self.onRejected = onRejected;
  };
  fn(resolve, reject);
}
// PromiseJ.prototype.then = (onFulfilled, onRejected) => {
//   const self = this;
//   console.log(self);
//   self.onFulfilled = onFulfilled;
//   self.onRejected = onRejected;
// };

module.exports = PromiseJ;
