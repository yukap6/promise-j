function PromiseJ(fn) {
  const self = this;
  const events = [];
  let status = 'pending';
  let data = null;
  self.onFulfilled = null;
  self.onRejected = null;
  if (typeof fn !== 'function') {
    throw new Error('Param of promise constuctor must be a function');
  }
  function executeEvents(newStatus, newData) {
    while (events.length) {
      (events.shift())(newStatus, newData);
    }
  }
  function resolve(fulFilledData) {
    if (status !== 'pending') {
      return;
    }
    data = fulFilledData;
    status = 'fulfilled';
    setTimeout(() => {
      if (typeof self.onFulfilled === 'function') {
        self.onFulfilled(data);
      }
      executeEvents(status, data);
    }, 0);
  }
  function reject(errorData) {
    if (status !== 'pending') {
      return;
    }
    status = 'rejected';
    data = errorData;
    setTimeout(() => {
      if (typeof self.onRejected === 'function') {
        self.onRejected(data);
      }
      executeEvents(status, data);
    }, 0);
  }
  self.then = (onFulfilled, onRejected) => {
    self.onFulfilled = onFulfilled;
    self.onRejected = onRejected;
    return new PromiseJ((resolve, reject) => {
      if (status === 'fulfilled') {
        resolve(data);
      } else if (status === 'rejected') {
        reject(data);
      } else if (status === 'pending') {
        // 监听 status 状态变化
        events.push((newStatus, newData) => {
          if (newStatus === 'fulfilled') {
            resolve(newData);
          } else if (newStatus === 'rejected') {
            reject(newData);
          }
        });
      }
    });
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
