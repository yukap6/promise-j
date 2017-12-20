/*
1 三种状态 pending、fulfilled、rejected
2 thenable，promise 链式调用或者继续返回 新的 promise
*/
var STATUS_PENDING = 'pending';
var STATUS_FULFILLED = 'fulfilled';
var STATUS_REJECTED = 'rejected';

// promise 的状态
var status = STATUS_PENDING;
var thenEventsHandler = []; // 保存 then 回调里传递的成功和失败回调处理函数
var successData, errorData; // 保存当前成功或失败的数据
var promise; // 用于保存 then 成功回调返回的 promise

// 成功处理函数
function resolve(data) {
  if (status !== STATUS_PENDING) {
    return;
  }
  status = STATUS_FULFILLED;
  successData = data;
  var tmpEventItem = null;
  while(tmpEventItem = thenEventsHandler.shift()) {
    var tmpResult;
    if (tmpEventItem.success) {
      tmpResult = tmpEventItem.success(successData);
    }
  }
}

// 失败处理函数
function reject(error) {
  if (status !== STATUS_PENDING) {
    return;
  }
  status = STATUS_REJECTED;
  errorData = error;
  var tmpEventItem = null;
  while(tmpEventItem = thenEventsHandler.shift()) {
    if (tmpEventItem.error) {
      tmpEventItem.error(errorData);
    }
  }
}

// 构造函数
function Promise(fn) {
  // fn check
  if (typeof fn !== 'function') {
    throw new Error('Param of promise constuctor must be a function');
  }
  var self = this;
  fn(resolve, reject);
}

// then 方法
Promise.prototype.then = function (resolveHandler, rejectHandler) {
  var self = this;
  if (status === STATUS_PENDING) {
    // 如果状态是 pending 则将回调处理函数入栈
    if (typeof resolveHandler === 'function' || typeof rejectHandler === 'function') {
      thenEventsHandler.push({
        success: typeof resolveHandler === 'function' ? resolveHandler : null,
        error: typeof rejectHandler === 'function' ? rejectHandler : null,
      });
    }
  } else {
    // 如果状态已经改变，则直接执行对应的回调处理函数
    if (status === STATUS_FULFILLED && typeof resolveHandler === 'function') {
      resolveHandler(successData);
    }
    if (status === STATUS_REJECTED && typeof rejectHandler === 'function') {
      rejectHandler(errorData);
    }
  }
  return promise || self;
};

module.exports = Promise;
