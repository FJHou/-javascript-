/**
 * 单例模式
 */

// 简单的单例

//  var Singleton = function ( name ) {
//    this.name = name
//    this.instance = null
//  }

//  Singleton.prototype = {
//   getName: function(){
//     console.log(this)
//     alert(this.name)
//   },
//   // 思考为什么
//   // getName: () => {
//   //   console.log(this) //window
//   //   alert(this.name)  // ''
//   // }
// }
//  Singleton.getInstance = function(name) {
//   if (!this.instance) {
//     this.instance = new Singleton(name)
//   }
//   return this.instance
//  }
// let a = Singleton.getInstance('a')
// let b = Singleton.getInstance('b')
// console.log(a.getName() === b.getName())

// 透明的单例
var CreateDiv = (function() {
  var instance = null;

  var CreateDiv = function(html) {
    this.html = html;
    this.init();
  }

  CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div)
  }

  return CreateDiv;
})()
// 代理类
var ProxySingletonCreateDiv = (function() {
  var instance;
  return function(html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }

    return instance;
  }
})()
var a = new ProxySingletonCreateDiv('a')
var b = new ProxySingletonCreateDiv('b')
console.log(a === b)
// console.log(CreateDiv)