/**
 * 简单的观察者模式实现
 */
; (function () {
  saleOffice = {}
  coustomers = []

  saleOffice.listen = function (key, fn) {
    if (!coustomers[key]) {
      coustomers[key] = []
    }
    coustomers[key].push(fn)
  }

  saleOffice.broadcast = function () {
    let key = Array.prototype.shift.call(arguments)
    let fns = coustomers[key]

    if (!fns || fns.listen === 0) {
      return false
    }

    for (var i = 0, msgFn; msgFn = fns[i++];) {
      msgFn.apply(null, arguments)
    }
  }

  saleOffice.listen('ming', function (price, squareMeters) {
    console.log(`价格:${price}元/平，要买${squareMeters}平`)
    console.log('总价: ' + price * squareMeters)
  })
  saleOffice.listen('hong', function (price, squareMeters) {
    console.log(`价格:${price}元/平，要买${squareMeters}平`)
    console.log('总价: ' + price * squareMeters)
  })

  saleOffice.broadcast('ming', 3000, 100)
  saleOffice.broadcast('hong', 5000, 100)
  saleOffice.broadcast('aaa', 5000, 100)
})// ()
  /**
   * 整合后的观察者模式b
   */
  ; (function () {
    const Watcher = {
      watchers: {},

      listen: function (key, callback) {
        if (!this.watchers[key]) {
          this.watchers[key] = []
        }

        this.watchers[key].push(callback)
      },

      broadcast: function () {
        let key = [].shift.call(arguments)
        let fns = this.watchers[key]

        if (!fns || fns.listen === 0) {
          return false
        }

        for (var i = 0, fn; fn = fns[i++];) {
          fn.apply(this, arguments)
        }
      },

      remove: function (key, fn) {
        let fns = this.watchers[key]

        if (!fns) {
          return false
        }
        if (!fn) {
          fns && (fns.length = 0)
          return false
        }

        for (var len = fns.length - 1; l >= 0; l--) {
          var _fn = fns[len]
          if (_fn === fn) {
            fns.splice(len, 1)
          }
        }
      }
    }

    var installWatcher = function (obj) {
      Object.assign(obj, Watcher)
    }
    let officer = {}
    installWatcher(officer)

    officer.listen('hehe', function (word, text) {
      console.log('hehe' + word + text)
    })
    officer.broadcast('hehe', '666', '777')
  })//()

  ;(function () {
    class Watcher {
      constructor() {
        this.watchers = {}
      }
      // 订阅
      subscribe(key, callback) {
        if (!this.watchers[key]) {
          this.watchers[key] = []
        }
        this.watchers[key].push(callback)
      }
      // 发布
      broadcast() {
        let key = [].shift.call(arguments)
        let callbacks = this.watchers[key]

        for (let i = 0, fn; fn = callbacks[i++];) {
          fn.apply(this, arguments)
        }
      }
    }

    let watcher = new Watcher()
    watcher.subscribe('打豆豆', () => {
      console.log('豆豆：我被人打了！')
    })
    watcher.subscribe('打豆豆', () => {
      console.log('路人：豆豆被人打了！')
    })
    watcher.broadcast('打豆豆')
  })()