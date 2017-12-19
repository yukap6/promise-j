/*
1 三种状态 pending、fulfilled、rejected
2 thenable，promise 链式调用或者继续返回 新的 promise
*/
var STATUS_PENDING = 'pending';
var STATUS_FULFILLED = 'fulfilled';
var STATUS_REJECTED = 'rejected';

// promise 的状态
var status = STATUS_PENDING;
var successEvents = [];
var failEvents = [];

// 成功处理函数
function resolve(data) {
  if (status !== STATUS_PENDING) {
    return;
  }
  status = STATUS_FULFILLED;
  var tmpFunc = null;
  while(tmpFunc = successEvents.shift()) {
    tmpFunc(data);
  }
}

// 失败处理函数
function reject(error) {
  if (status !== STATUS_PENDING) {
    return;
  }
  status = STATUS_REJECTED;
  var tmpFunc = null;
  while(tmpFunc = failEvents.shift()) {
    tmpFunc(error);
  }
}

// 构造函数
function Promise(fn) {
  // fn check
  if (typeof fn !== 'function') {
    throw new Error('Param of promise constuctor must be a function');
  }
  var self = this;
  self.fn = fn;
  self.error = null;
  fn(resolve, reject);
}

// then 方法
Promise.prototype.then = function (resolveHandler, rejectHandler) {
  var self = this;
  if (status === STATUS_PENDING) {
    // 如果状态是 pending 则将回调处理函数入栈
    if (typeof resolveHandler === 'function') {
      successEvents.push(resolveHandler);
    }
    if (typeof rejectHandler === 'function') {
      failEvents.push(rejectHandler);
    }
  } else {
    // 如果状态已经改变，则直接执行对应的回调处理函数
    if (status === STATUS_FULFILLED) {
      resolveHandler();
    }
    if (status === STATUS_REJECTED) {
      rejectHandler();
    }
  }
  return self;
};
module.exports = Promise;
