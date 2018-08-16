var Q = require('q');
var defer = Q.defer();
var a = (x, y) => {
    return x * y
};
console.log(a(1, 2));

(function b() {
    var x = "Hello!!";      // 我将调用自己
    console.log(x);
})();

