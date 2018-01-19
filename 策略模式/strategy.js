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
    'isMobile': function(value, mobileRule,errMsg) {
      if (!(mobileRule instanceof RegExp)) {
        return console.log('mobileRule 必须为正则表达式！')
      }
      if (!mobileRule.test(value)) {
        return errMsg
      }
    }
  }

  
})