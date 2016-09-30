import {Observable, Observer} from "rx";
interface Window { cc: any };
window.cc = window.cc || {};


/*
var source1 = Observable.create(observer => {
  var i = 0;
  var id = setInterval(function() {
    observer.onNext(i++);
    if (10 < i) {
      clearInterval(id);
      observer.onCompleted();
    }
  }, 100);
});
var source2 = Observable.create(observer => {
  var i = 0;
  var id = setInterval(function() {
    observer.onNext(i++ * 2);
    if (10 < i) {
      clearInterval(id);
      observer.onCompleted();
    }
  }, 100);
});




*/
var event$ = Observable.create(observer => {
  
});

var observer = Observer.create(
  function onNext() {
    return arguments[0];
  },
  function onError() {},
  function onComplete() {}
);

event$.subscribe(observer)
  //.throttle(1000)
  .subscribe(function() {
    console.log("FFFFF");
  }, function(err) {
    console.log("err: " + err);
  }, function() {
    console.log("COMPLETED");
  })

let cc = window.cc;

cc.EventListener.create = (function(origMethod) {
  var withLogging = function(handler) {
    return function() {
      var result = handler.apply(handler, arguments);
      observer.onNext.apply(observer, arguments);
      return result;
    };
  };
  return function(config) {
    for(var key in config) {
      if (key.substr(0, 2) === "on" && typeof config[key] == "function") {
        console.log("overrided: " + key);
        config[key] = withLogging(config[key]);
      }
    }
    return origMethod.call(cc.EventListener, config);
  };
})(cc.EventListener.create);


console.log("OOh");
//*/
