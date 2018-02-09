;(function() {
// 面向对象的策略模式
// 策略类
var performanceA = function () {

}
performanceA.prototype.calculate = function (salary) {
  return salary * 4
}

var performanceB = function () {

}
performanceB.prototype.calculate = function (salary) {
  return salary * 3
}

var performanceC = function () {

}
performanceC.prototype.calculate = function (salary) {
  return salary * 2
}
// 奖金类
var Money = function() {
  this.money = null;
  this.strategy = null;
}
Money.prototype.setSalary = function (salary) {
  this.money = salary
}
Money.prototype.setStrategy = function (strategy) {
  this.strategy = strategy
}
Money.prototype.getMoney = function () {
  return this.strategy.calculate(this.money)
}

var bouns = new Money()
bouns.setSalary(1000)
bouns.setStrategy(new performanceA())
console.log(bouns.getMoney())
})()

// javascript 版本的策略模式
;(function() {
  var strategies = {
    'A': function(salary) {
      return salary * 4
    },
    'B': function(salary) {
      return salary * 3
    },
    'C': function(salary) {
      return salary * 2
    }
  }

  var getMoney = function(level, salary) {
    return strategies[level](salary)
  }
  console.log(getMoney('C', 500)) // 1000
})()

// 表单提交策略模式
;(function() {
  var strategies = {
    'isNoEmpty': function(value, errMsg) {
      if (value === '') {
        return errMsg
      }
    },
    'isMinLength': function(value, length, errMsg) {
      if (value.length !== length) {
        return errMsg
      }
    },
    'isMobile': function(value, errMsg) {
      var mobileRule = /^1[3|5|8]\d{9}$/
      if (!mobileRule.test(value)) {
        return errMsg
      }
    }
  }
/**
 * ES6 写法
 */
class Validate {
  constructor () {
    this.cache = [];
  }

  add (value, rules) {
    // let self = this
    // console.log(this)
    for (let i = 0, rule; rule = rules[i++];) {
      // function (rule) {
        let strategyArr = rule.strategy.split(':')
        let errMsg = rule.errMsg
        this.cache.push(() => {
          let strategy = strategyArr.shift()
          strategyArr.unshift(value)
          strategyArr.push(errMsg)
          return strategies[strategy].apply(value, strategyArr)
        })
      // })(rule)
    }
  }

  start () {
    for (var i = 0, validateFn; validateFn = this.cache[i++];) {
      let errMsg = validateFn()
      if (errMsg) {
        return errMsg
      }
    }
  }
}
  // var Validate = function() {
  //   this.cach = []
  // }

  // Validate.prototype.add = function (value, rules) {
  //   var slef = this
  //   for (var i = 0, rule; rule = rules[i++];) {
  //     (function (rule) {
  //       var strategyArr = rule.strategy.split(':')
  //       var errMsg = rule.errMsg
  //       slef.cach.push(function() {
  //         var strategy = strategyArr.shift()
  //         strategyArr.unshift(value)
  //         strategyArr.push(errMsg)
  //         console.log(strategyArr)
  //         return strategies[strategy].apply(valuedom, strategyArr)
  //       })
  //     })(rule)
  //   }
  // }

  // Validate.prototype.start = function () {
  //   for (var i = 0, validateFn; validateFn = this.cach[i++];) {
  //     let errMsg = validateFn()
  //     if (errMsg) {
  //       return errMsg
  //     }
  //   }
  // }

  var validateFn = function() {
    let validate = new Validate()
    validate.add(input.value, [
      {strategy: 'isNoEmpty', errMsg: '不能为空'},
      {strategy: 'isMobile', errMsg: '不是手机号'}
    ])
    let err = validate.start()
    return err
  }

  let input = document.getElementById('account')
  let button = document.getElementById('accountValidate')

  button.addEventListener('click', function() {
    var err = validateFn()
    if (err) {
      alert(err)
      return false
    }
  })
  
})()