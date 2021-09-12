describe.skip("1. Values, types and operators", () => {
  describe("konkatenacja stringow", () => {
    it("jezeli chociaz jeden element który dodajemy nie bedzie number, to wyrazenie sprowadzi sie do stringa", () => {
      const result = "1" + 2 + 4 + 56 + 624324 + 4323;
      expect(result).toBe("124566243244323");
      expect(typeof result).toBe("string");
    });

    it("operacje konkatenacja działają od lewej do prawej", () => {
      const result = 1 + 100 + 42 + " $";
      expect(result).toBe("143 $");
      expect(typeof result).toBe("string");
    });

    it("obiekty są sprowadzane do wyrazenia stringowego [object Object]", () => {
      const result = 1 + { a: 1, b: 2 } + 42 + " $";
      expect(result).toBe("1[object Object]42 $");
      expect(typeof result).toBe("string");
    });

    it("jezeli dokonujemy niemozliwych operacji matematycznych", () => {
      const result =
        "" +
        1 / "TEST" +
        1 / "TEST" +
        1 / "TEST" +
        1 / "TEST" +
        1 / "TEST" +
        1 / "TEST" +
        1 / "TEST" +
        " Batman";
      expect(result).toBe("NaNNaNNaNNaNNaNNaNNaN Batman");
      expect(typeof result).toBe("string");
    });

    it("roznica między prymitywem string a obiektem String", () => {
      const color1 = new String("green");
      const color2 = new String("green");
      const color3 = "coral";
      const color4 = "coral";

      expect(color1 instanceof String).toBeTruthy();
      expect(color2 instanceof String).toBeTruthy();
      expect(color3 instanceof String).toBeFalsy();
      expect(color4 instanceof String).toBeFalsy();
      expect(color1 === color2).toBeFalsy();
      expect(color3 === color4).toBeTruthy();
    });

    it("roznica między prymitywem string a obiektem String 2", () => {
      const color1 = new String("green");
      const color2 = new String("green");
      const color3 = "coral";
      const color4 = "coral";

      color1.test = function () {};
      color2.test = function () {};
      color3.test = function () {};
      color4.test = function () {};

      expect(color1.test).toBeDefined();
      expect(color2.test).toBeDefined();
      expect(color3.test).not.toBeDefined();
      expect(color4.test).not.toBeDefined();
    });

    it.skip("napisz kawałek kodu który zaliczy test, ", () => {
      let result = "";
      const sing = () => {};

      for (let i = 0; i < 16; i++) {
        result += sing();
      }

      expect(result).toBe(
        "Na Na Na Na Na Na Na Na Na Na Na Na Na Na Na Na BATMAN!"
      );
    });
  });

  describe("wrappers pułapki", () => {
    it("primityw i obiekt boolean", () => {
      let counter = 0;
      const primitiveFound = false;
      if (primitiveFound) {
        counter++;
      }

      const found = new Boolean(false);
      if (found) {
        counter = counter + 100;
      }
      expect(counter).toBe(1);
    });
  });
});

describe.skip("2. Conditional statement", () => {
  const NULL = null;
  const UNDEFINED = undefined;
  const NAN = NaN;
  const EMPTY_STRING = "";
  const ONE_STRING = "0";
  const MINUS_ONE_STRING = "-1";
  const ZERO = 0;

  describe("aby poprawić jakość codu można wykorzystać następujące wyrażenia", () => {
    it("wszystkie wyrazenia maja wartość false", () => {
      let visited = false;
      if (NULL) {
        visited = true;
      }
      if (UNDEFINED) {
        visited = true;
      }
      if (NAN) {
        visited = true;
      }
      if (EMPTY_STRING) {
        visited = true;
      }

      // nie doda wartosci do zmiennej
      // if (ONE_STRING == true) {
      //         visited = true;
      // }
      // if (MINUS_ONE_STRING == true) {
      //         visited = true;
      // }

      // doda wartosci do zmiennej
      // if (ONE_STRING) {
      //         visited = true;
      // }
      // if (MINUS_ONE_STRING) {
      //         visited = true;
      // }

      if (ZERO) {
        visited = true;
      }
      expect(visited).toBeFalsy();
    });

    it("use case: przeszukiwanie tablicy", () => {
      let visited = false;
      const users = [];
      const user = users.find((user) => user.id === 1);
      if (user) {
        visited = true;
      }
      expect(visited).toBeFalsy();
    });

    it("sprawdzenie czy pusta tablica", () => {
      let visited = false;
      const users = [];
      if (users.length) {
        //zamiast if(users.length === 0)
        visited = true;
      }
      expect(visited).toBeFalsy();
    });

    it("sprawdzenie czy string jest pusty", () => {
      const queryBuilder = (zero) => {
        try {
          if (!zero) {
            throw new Error("nie może być 0");
          }
          return "SELECT * FROM TABELA";
        } catch (e) {
          return "";
        }
      };

      let visited = false;

      const queryStringBuilder = queryBuilder(0);
      if (queryStringBuilder) {
        //zamiast if(queryStringBuilder.length !== 0)
        visited = true;
      }
      expect(visited).toBeFalsy();
    });
  });

  describe("porywnywanie zmiennych przez '==' i '===' ", () => {
    it("null == undefined", () => {
      let visited = false;
      const el1 = null;
      const el2 = undefined;

      if (el1 == el2) {
        visited = true;
      }

      expect(visited).toBeTruthy();
    });

    it("null === undefined", () => {
      let visited = false;
      const el1 = null;
      const el2 = undefined;

      if (el1 === el2) {
        visited = true;
      }

      expect(visited).toBeFalsy();
    });

    it("obj1 z nadpisywaniem funckcji toString", () => {
      let visited = false;
      const el1 = {};
      el1.toString = function () {
        return "RAZ_DWA_TRZY";
      };

      if (el1 == "RAZ_DWA_TRZY") {
        visited = true;
      }

      expect(visited).toBeTruthy();
    });
  });
});

describe.skip("3. Loops", () => {
  describe("różnica miedzy for in, for of", () => {
    it("for in array", () => {
      const result = [];
      const arr = ["a", "b", "c"];
      for (const key in arr) {
        result.push(key);
      }
      expect(result).toEqual(["0", "1", "2"]);
    });

    it("for in MAP", () => {
      const result = [];
      const map = new Map();
      map.set("a", 3);
      map.set("b", 2);
      map.set("c", 1);

      for (const key in map) {
        result.push(key);
      }
      expect(result).toEqual([]);
    });

    it("for of array", () => {
      const result = [];
      const arr = ["a", "b", "c"];
      for (const key of arr) {
        result.push(key);
      }
      expect(result).toEqual(["a", "b", "c"]);
    });

    it("for of MAP", () => {
      const result = [];
      const map = new Map();
      map.set("a", 3);
      map.set("b", 2);
      map.set("c", 1);

      for (const [key, value] of map) {
        result.push(key);
      }
      expect(result).toEqual(["a", "b", "c"]);
    });

    it("for of SET", () => {
      const result = [];
      const set = new Set();
      set.add("1");
      set.add("2");
      set.add("3");
      set.add("3");
      set.add("3");
      set.add("2");
      set.add("1");
      set.add("6");

      for (const key of set) {
        result.push(key);
      }
      expect(result).toEqual(["1", "2", "3", "6"]);
    });
  });
});

describe.skip("4. Functions", () => {
  function sub(c, d) {
    this.result = c - d;
  }
  function add(c, d) {
    this.result = c + d;
  }
  function multiply(c, d) {
    this.result = c * d;
  }

  it("function expresion do zmiennej typu var", () => {
    expect(fun).toBe(undefined);

    var fun = function () {
      return 42;
    };
  });

  it.skip("function expresion do zmiennej typu const", () => {
    expect(fun()).toBe(42);

    const fun = function () {
      return 42;
    };
  });

  it.skip("function expresion do zmiennej typu let", () => {
    expect(fun()).toBe(42);

    let fun = function () {
      return 42;
    };
  });

  it("function declaration", () => {
    expect(fun()).toBe(42);

    function fun() {
      return 42;
    }
  });

  it("przykłady wykorzystania bind", () => {
    const obj = {
      a: 1,
      b: 2,
    };
    const obj2 = {
      a: 3,
      b: 4,
    };

    const subFunc1 = sub.bind(obj);
    const addFunc1 = add.bind(obj);
    const multiplyFunc1 = multiply.bind(obj);

    expect(obj.result).toBe(undefined);
    subFunc1(obj.a, obj.b);
    expect(obj.result).toBe(-1);
    addFunc1(obj.a, obj.b);
    expect(obj.result).toBe(3);
    multiplyFunc1(obj.a, obj.b);
    expect(obj.result).toBe(2);

    const subFunc2 = sub.bind(obj2);
    const addFunc2 = add.bind(obj2);
    const multiplyFunc2 = multiply.bind(obj2);

    expect(obj2.result).toBe(undefined);
    subFunc2(obj2.a, obj2.b);
    expect(obj2.result).toBe(-1);
    addFunc2(obj2.a, obj2.b);
    expect(obj2.result).toBe(7);
    multiplyFunc2(obj2.a, obj2.b);
    expect(obj2.result).toBe(12);
  });

  it("przykłady wykorzystania call", () => {
    const obj = {
      a: 1,
      b: 2,
    };
    const obj2 = {
      a: 3,
      b: 4,
    };

    expect(obj.result).toBe(undefined);
    sub.call(obj, obj.a, obj.b);
    expect(obj.result).toBe(-1);
    add.call(obj, obj.a, obj.b);
    expect(obj.result).toBe(3);
    multiply.call(obj, obj.a, obj.b);
    expect(obj.result).toBe(2);

    sub.call(obj2, obj2.a, obj2.b);
    expect(obj2.result).toBe(-1);
    add.call(obj2, obj2.a, obj2.b);
    expect(obj2.result).toBe(7);
    multiply.call(obj2, obj2.a, obj2.b);
    expect(obj2.result).toBe(12);
  });

  it("przykłady wykorzystania apply", () => {
    const obj = {};
    const obj2 = {};
    const argumentsArray1 = [1, 2];
    const argumentsArray2 = [3, 4];

    expect(obj.result).toBe(undefined);
    sub.apply(obj, argumentsArray1);
    expect(obj.result).toBe(-1);
    add.apply(obj, argumentsArray1);
    expect(obj.result).toBe(3);
    multiply.apply(obj, argumentsArray1);
    expect(obj.result).toBe(2);

    sub.apply(obj2, argumentsArray2);
    expect(obj2.result).toBe(-1);
    add.apply(obj2, argumentsArray2);
    expect(obj2.result).toBe(7);
    multiply.apply(obj2, argumentsArray2);
    expect(obj2.result).toBe(12);
  });

  describe("IIFE – Immediatly Invoked Function Expression", () => {
    it("wywołanie IIFE, jako sposob aby nie zasmieciac obiektu window", () => {
      (function () {
        let firstVariable;
        let secondVariable;
      })();

      expect(firstVariable).toBe(undefined);
      expect(secondVariable).toBe(undefined);
    });

    it("wywołanie IIFE, jako modul", () => {
      const makeWithdraw = (balance) =>
        (function (copyBalance) {
          let balance = copyBalance; // prywatna zmienna
          return {
            withdraw: function (amount) {
              if (balance >= amount) {
                balance -= amount;
                return balance;
              } else {
                return "Brakło pieniedzy";
              }
            },
          };
        })(balance);

      const firstAccount = makeWithdraw(100);
      expect(firstAccount.balance).toBe(undefined);
      expect(firstAccount.withdraw(20)).toBe(80);
      expect(firstAccount.withdraw(30)).toBe(50);
      expect(firstAccount.balance).toBe(undefined);

      const secondAccount = makeWithdraw(20);
      expect(secondAccount.withdraw(30)).toBe("Brakło pieniedzy");
      expect(secondAccount.withdraw(20)).toBe(0); // 0
    });
  });
});

describe.skip("5. This", () => {
  describe("function invocation", () => {
    it("function invocation", () => {
      function test() {
        expect(this.expect).toBe(expect);
      }
      test();
    });

    it("use strict", () => {
      function test() {
        "use strict";
        expect(this).toBe(undefined);
      }
      test();
    });

    it("wewnatrz obiektu", () => {
      const numbers = {
        numberA: 5,
        numberB: 10,

        sum: function () {
          expect(this.numberA).toBe(5);
          expect(this.numberB).toBe(10);

          function calculate() {
            expect(this.numberA).not.toBe(5);
            expect(this.numberB).not.toBe(10);
            expect(this.expect).toBe(expect);
            return this.numberA + this.numberB;
          }

          return calculate();
        },
      };

      const result = numbers.sum();
      expect(result).not.toBe(15);
    });

    it("wewnatrz obiektu z uzyciem call", () => {
      const numbers = {
        numberA: 5,
        numberB: 10,

        sum: function () {
          expect(this.numberA).toBe(5);
          expect(this.numberB).toBe(10);

          function calculate() {
            expect(this.numberA).toBe(5);
            expect(this.numberB).toBe(10);
            return this.numberA + this.numberB;
          }

          return calculate.call(this);
        },
      };

      const result = numbers.sum();
      expect(result).toBe(15);
    });

    it("iife", () => {
      function execute() {
        expect(this.expect).toBe(expect);

        function concat(str1, str2) {
          expect(this.expect).toBe(expect);
          return str1 + str2;
        }

        concat("Hello", " World!");
      }
      execute();
    });

    it("iife + use strict", () => {
      function execute() {
        "use strict";
        expect(this).toBe(undefined);

        function concat(str1, str2) {
          function sing(str1, str2) {
            expect(this).toBe(undefined);
          }

          expect(this).toBe(undefined);
          sing();

          return str1 + str2;
        }
        concat("Hello", " World!");
      }
      execute();
    });
  });

  describe("method invocation", () => {
    it("wywołanie metody wewnatrz obiektu", () => {
      const obj = {
        name: "John",
        age: 30,
        sayHello: function () {
          expect(this.name).toBe("John");
          expect(this.age).toBe(30);
          return "Hello " + this.name;
        },
      };

      const result = obj.sayHello(); // -> sayHello.call(obj)
      expect(result).toBe("Hello John");
    });

    it("wywołanie metody wewnatrz obiektu inaczej", () => {
      const obj = {
        name: "John",
        age: 30,
        sayHello: function () {
          expect(this.expect).toBe(expect);
          expect(this.name).not.toBe("John");
          expect(this.age).not.toBe(30);
          return "Hello " + this.name;
        },
      };

      const fun = obj.sayHello;
      expect(fun()).toBe("Hello "); // -> sayHello.call(this)
    });

    it("wywołanie metody wewnatrz obiektu z uzyciem call", () => {
      const obj = {
        name: "John",
        age: 30,
        sayHello: function () {
          expect(this.name).toBe("John");
          expect(this.age).toBe(30);
          return "Hello " + this.name;
        },
      };

      const fun = obj.sayHello;
      const bindedFun = obj.sayHello.bind(obj);
      expect(bindedFun()).toBe("Hello John");

      expect(fun.call(obj)).toBe("Hello John");
      expect(fun.apply(obj)).toBe("Hello John");
      expect(obj.sayHello.apply(obj)).toBe("Hello John");
      expect(obj.sayHello.apply(obj)).toBe("Hello John");
      expect(obj.sayHello()).toBe("Hello John");
      expect(obj.sayHello()).toBe("Hello John");
    });
  });

  describe("constructor invocation", () => {
    it("wywołanie konstruktora", () => {
      function Person(name, age) {
        this.name = name;
        this.age = age;
      }

      const person = new Person("John", 30);
      expect(person.name).toBe("John");
      expect(person.age).toBe(30);
    });

    it("wywołanie konstruktora + próba ustawienia prywatnych zmiennych ", () => {
      // wszystko co ma w sobie "_" to prywatne, przynajmniej taka jest konwencja
      function Person(name, age) {
        this._ = {
          name,
          age,
        };
      }

      const person = new Person("John", 30);
      expect(person.name).not.toBe("John");
      expect(person.age).not.toBe(30);
    });

    it("wywołanie konstruktora w błedny sposób inaczej", () => {
      function Person(name, age) {
        this.name = name;
        this.age = age;
      }

      const person = Person("John", 30);
      expect(person).toBe(undefined);
    });

    it("wywołanie konstruktora w błedny sposób inaczej, ale dodane zabezpieczenie", () => {
      function Person(name, age) {
        if (!(this instanceof Person)) {
          throw Error("Error: Incorrect invocation");
        }
        this.name = name;
        this.age = age;
      }

      expect(new Person("John", 30)).toBeInstanceOf(Person);
      try {
        Person("John", 30);
      } catch (e) {
        expect(e.message).toBe("Error: Incorrect invocation");
      }
    });
  });

  describe("zadania", () => {
    it("1", () => {
      function Person(name, age) {
        this.name = name;
        this.age = age;
      }

      Person.prototype.sayHello = function () {
        return `Hello ${this.name}`;
      };

      const person = new Person("John", 30);
      expect(person.sayHello()).toBe("");
    });

    it("2", () => {
      const fullname = "John Doe";
      const obj = {
        fullname: "Colin Ihrig",
        prop: {
          fullname: "Aurelio De Rosa",
          getFullname: function () {
            return this.fullname;
          },
        },
      };

      const test = obj.prop.getFullname;
      expect(obj.prop.getFullname()).toBe("");
      expect(test()).toBe("");
      expect(test.call({ fullname: "test" })).toBe("");
    });

    it("3", () => {
      const car = {
        brand: "Nissan",
        getBrand: function () {
          const self = this;
          const closure = function () {
            return self.brand;
          };
          return closure();
        },
      };

      expect(car.getBrand()).toBe("");
    });
  });
});

describe.skip("6. Hoisting", () => {
  it("przypisanie zmiennej typu var", () => {
    expect(a).toBe(undefined);
    var a = 1;
    expect(a).toBe(1);
  });

  it.skip("przypisanie zmiennej typu let", () => {
    expect(a).toBe(undefined);
    let a = 1;
    expect(a).toBe(1);
  });

  it.skip("przypisanie zmiennej typu const", () => {
    expect(a).toBe(undefined);
    const a = 1;
    expect(a).toBe(1);
  });

  it("przypisanie deklaracja funkcji", () => {
    expect(fun).not.toBe(undefined);

    function fun() {
      return 2;
    }

    expect(fun()).toBe(2);
  });

  it("przypisanie deklaracja funkcji i zmienner typu var o tej samej nazwie", () => {
    expect(fun).not.toBe(undefined);
    expect(fun()).toBe(2);

    var fun = 1;

    function fun() {
      return 2;
    }

    expect(fun).toBe(1);
  });

  it("deklaracja klasy przed stworzeniem instancji klasy", () => {
    class Hobbit {
      constructor(height, weight) {
        this.height = height;
        this.weight = weight;
      }
    }

    var Frodo = new Hobbit();
    Frodo.height = 100;
    Frodo.weight = 300;
    expect(Frodo.height).toBe(100);
    expect(Frodo.weight).toBe(300);
  });

  it.skip("deklaracja klasy po stworzeniem instancji klasy", () => {
    var Frodo = new Hobbit();
    Frodo.height = 100;
    Frodo.weight = 300;

    class Hobbit {
      constructor(height, weight) {
        this.height = height;
        this.weight = weight;
      }
    }
  });
});

describe.skip("7. Closures", () => {
  it("licznik", () => {
    const counter = (initial) => {
      let count = initial;
      return {
        add: () => {
          count++;
          return count;
        },
        reset: () => {
          count = initial;
          return count;
        },
      };
    };

    const c = counter(0);

    c.add();
    c.add();
    c.add();
    expect(c.counter).toBe(undefined);
    expect(c.add()).toBe(4);
    expect(c.reset()).toBe(0);
  });

  it("kolejka zadań", () => {
    const taskQueue = () => {
      let queue = [];
      return {
        take: () => {
          if (queue.length) {
            const currentTask = queue.pop();
            return (arg) => currentTask(arg);
          }
          return () => {};
        },
        add: (task) => {
          queue.push(task);
        },
      };
    };

    const queue = taskQueue();
    let count = 0;
    queue.add((arg) => (count += arg));
    queue.add((arg) => (count += arg));
    queue.add((arg) => (count += arg));
    queue.add((arg) => (count += arg));

    queue.take()(12);
    expect(count).toBe(12);
    queue.take()(23);
    expect(count).toBe(35);
    queue.take()(34);
    expect(count).toBe(69);
    queue.take()(45);
    expect(count).toBe(114);
    queue.take()(45);
    queue.take()(45);
    queue.take()(45);
  });

  it("wykonaj wywolanie zwyczajnej funkcji zapisz w ramie", () => {
    const cache = (func) => {
      const cache = {};
      return (...args) => {
        const key = args.join("-");
        if (cache[key]) {
          return cache[key];
        }
        const result = func(...args);
        cache[key] = result;
        return result;
      };
    };

    let counter = 0;
    const sum = (a, b) => {
      counter++;
      return a + b;
    };

    const sumCached = cache(sum);
    expect(sumCached(1, 2)).toBe(3);
    expect(sumCached(1, 3)).toBe(4);
    expect(sumCached(1, 4)).toBe(5);
    expect(sumCached(1, 2)).toBe(3);
    expect(sumCached(1, 3)).toBe(4);
    expect(sumCached(1, 4)).toBe(5);
    expect(sumCached(1, 2)).toBe(3);
    expect(sumCached(1, 3)).toBe(4);
    expect(sumCached(1, 4)).toBe(5);
    expect(counter).toBe(3);
  });

  it("dekorator", () => {
    const sum = (...initial) => {
      return (...first) => {
        return (...second) => {
          return (...third) => {
            return (
              initial.reduce((a, b) => a + b, 0) +
              first.reduce((a, b) => a + b, 0) +
              second.reduce((a, b) => a + b, 0) +
              third.reduce((a, b) => a + b, 0)
            );
          };
        };
      };
    };

    const firstPart = sum(10);
    const secondPart = firstPart(20, 30);
    const thirdPart = secondPart(30);

    expect(thirdPart(40)).toBe(130);
    expect(thirdPart(50)).toBe(140);
    expect(thirdPart(60)).toBe(150);
    expect(thirdPart(70)).toBe(160);
    expect(thirdPart(80)).toBe(170);
  });

  it("zadania", () => {
    it("stwórz cache dla którego kolejność argumentów nie ma znaczenia", () => {
      const cache = (func) => {
        return (...args) => {
          const result = func(...args);
          return result;
        };
      };

      let counter = 0;
      const sum = (a, b) => {
        counter++;
        return a + b;
      };

      const sumCached = cache(sum);
      expect(sumCached(1, 2)).toBe(3);
      expect(sumCached(1, 3)).toBe(4);
      expect(sumCached(1, 4)).toBe(5);
      expect(sumCached(1, 2)).toBe(3);
      expect(sumCached(1, 3)).toBe(4);
      expect(sumCached(1, 4)).toBe(5);
      expect(sumCached(1, 2)).toBe(3);
      expect(sumCached(1, 3)).toBe(4);
      expect(sumCached(1, 4)).toBe(5);
      expect(sumCached(2, 1)).toBe(3);
      expect(sumCached(3, 1)).toBe(4);
      expect(sumCached(4, 1)).toBe(5);
      expect(sumCached(2, 1)).toBe(3);
      expect(sumCached(3, 1)).toBe(4);
      expect(sumCached(4, 1)).toBe(5);
      expect(sumCached(2, 1)).toBe(3);
      expect(sumCached(3, 1)).toBe(4);
      expect(sumCached(4, 1)).toBe(5);
      expect(counter).toBe(3);
    });
  });
});

describe.skip("8. Prototype", () => {
  it("prototype i __proto__", () => {
    function Human(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    const sayHello = function () {
      console.log(`Hi, I'm ${this.firstName}`);
    };
    Human.prototype.sayHello = sayHello;
    const john = new Human("John", "Snow");

    expect(john.__proto__).toBe(Human.prototype);
    expect(john.prototype).toBe(undefined);
    expect(Human.prototype.sayHello).toBe(sayHello);
  });

  it("prototype i __proto__, dobre praktyki", () => {
    //wolniejsze, bo kazda instacja ma wlasna kopie sayHello
    function Human(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.sayHello = function () {
        console.log(`Hi, I'm ${this.firstName}`);
      };
    }

    //szybsze, bo wszystkie instacje wykorzystuja jedną kopie sayHello
    function Human2(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    Human2.prototype.sayHello = function () {
      console.log(`Hi, I'm ${this.firstName}`);
    };
  });

  it("dziedziczenie przez prototype", () => {
    //szybsze, bo wszystkie instacje wykorzystuja jedną kopie sayHello
    function Human(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    Human.prototype.walk = function () {
      return "I am human";
    };

    function Medic(firstName, lastName, specialization) {
      Human.call(this, firstName, lastName);
      this.specialization = specialization;
    }
    Medic.prototype = Object.create(Human.prototype);
    Medic.prototype.heal = function () {
      return `I am ${this.specialization}`;
    };
    const medic = new Medic("John", "Snow", "surgeon");

    expect(medic.__proto__).toBe(Medic.prototype);
    expect(medic.prototype).toBe(undefined);
    expect(medic.walk()).toBe("I am human");
    expect(medic.heal()).toBe("I am surgeon");
  });

  it("dziedziczenie przez class", () => {
    class Human {
      constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      }
      walk() {
        return "I am human";
      }
    }

    class Medic extends Human {
      constructor(firstName, lastName, specialization) {
        super(firstName, lastName);
        this.specialization = specialization;
      }
      heal() {
        return `I am ${this.specialization}`;
      }
    }

    const medic = new Medic("John", "Snow", "surgeon");

    expect(medic.__proto__).toBe(Medic.prototype);
    expect(medic.prototype).toBe(undefined);
    expect(medic.walk()).toBe("I am human");
    expect(medic.heal()).toBe("I am surgeon");
  });

  describe("zadanie", () => {
    // Zdefiniuj funkcje dziedziczące z prototype Animal

    // I. Shark
    // konstruktor przyjmuje 3 argumenty name, age, status, kazdy rekin ma 0 nog, i jest gatunku (species) shark,

    // II. Cat
    // konstruktor przyjmuje 3 argumenty name, age, status, kazdy kot ma 4 nogi, i jest gatunku (species) cat,
    // metoda introduce powinna zawierac dokladnie takie samo przywitanie jak kazde zwierze typu Animal oraz dopisek Meow meow!

    // III. Dog
    // konstruktor przyjmuje 4 argumenty name, age, status, oraz master, kazdy pies ma 4 nogi, i jest gatunku (species) dog,
    // metoda introduce powinna zawierac dokladnie takie samo przywitanie jak kazde zwierze typu Animal oraz dopisek Hellow ${master}!

    function Animal(name, age, legs, species, status) {
      this.name = name;
      this.age = age;
      this.legs = legs;
      this.species = species;
      this.status = status;
    }
    Animal.prototype.introduce = function () {
      return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    };

    describe("The Shark function prototype", () => {
      it("test dla rekina", () => {
        const billy = new Shark("Billy", 3, "Alive and well");
        expect(billy.name).toBe("Billy");
        expect(billy.age).toBe(3);
        expect(billy.legs).toBe(0);
        expect(billy.species).toBe("shark");
        expect(billy.status).toBe("Alive and well");
        expect(billy.introduce()).toBe(
          `Hello, my name is Billy and I am 3 years old.`
        );

        const charles = new Shark("Charles", 8, "Finding a mate");
        expect(charles.name).toBe("Charles");
        expect(charles.age).toBe(8);
        expect(charles.legs).toBe(0);
        expect(charles.species).toBe("shark");
        expect(charles.status).toBe("Finding a mate");
        expect(charles.introduce()).toBe(
          `Hello, my name is Charles and I am 8 years old.`
        );
      });
    });

    describe("The Cat function prototype", () => {
      it("test dla kota", () => {
        const cathy = new Cat("Cathy", 7, "Playing with a ball of yarn");
        expect(cathy.name).toBe("Cathy");
        expect(cathy.age).toBe(7);
        expect(cathy.legs).toBe(4);
        expect(cathy.species).toBe("cat");
        expect(cathy.status).toBe("Playing with a ball of yarn");
        expect(cathy.introduce()).toBe(
          "Hello, my name is Cathy and I am 7 years old.  Meow meow!"
        );
        const spitsy = new Cat("Spitsy", 6, "sleeping");
        expect(spitsy.name).toBe("Spitsy");
        expect(spitsy.age).toBe(6);
        expect(spitsy.legs).toBe(4);
        expect(spitsy.species).toBe("cat");
        expect(spitsy.status).toBe("sleeping");
        expect(spitsy.introduce()).toBe(
          "Hello, my name is Spitsy and I am 6 years old.  Meow meow!"
        );
      });
    });

    describe("The Dog function prototype", () => {
      it("test dla psa", () => {
        const doug = new Dog("Doug", 12, "Serving his master", "Eliza");
        expect(doug.name).toBe("Doug");
        expect(doug.age).toBe(12);
        expect(doug.legs).toBe(4);
        expect(doug.species).toBe("dog");
        expect(doug.status).toBe("Serving his master");
        expect(doug.introduce()).toBe(
          "Hello, my name is Doug and I am 12 years old."
        );
        expect(doug.greetMaster()).toBe("Hello Eliza");
      });
    });
  });
});

describe.skip("9. syntax ES6", () => {
  describe("let & const", () => {
    it("let", () => {
      //ReferenceError: Cannot access 'a' before initialization
      //a = 2;
      let a = 1;
      a = 2;
      expect(a).toBe(2);
    });
    it("const", () => {
      //ReferenceError: Cannot access 'a' before initialization
      //a = 2;
      const a = 1;
      //TypeError: Assignment to constant variable.
      //a = 2;
      expect(a).toBe(1);
    });
  });

  describe("funkcje strzałkowe", () => {
    it("prosty przykład", () => {
      const f = () => 1;
      expect(f()).toBe(1);
    });

    it("z argumentami", () => {
      const f = (a, b) => a + b;
      expect(f(1, 2)).toBe(3);
    });

    it("z argumentami i klemami", () => {
      const f = (a, b) => {
        return a + b;
      };
      expect(f(1, 2)).toBe(3);
    });

    it("przekazanie funkcji do funkcji", () => {
      const sum = (a, b) => a + b;
      const extraSum = (fun) => fun() * fun();
      const sumFun = () => sum(5, 5);

      expect(extraSum(() => sumFun())).toBe(100);
      expect(extraSum(sumFun)).toBe(100);
    });
  });

  describe("wartosci domyslne", () => {
    const sum = (a = -1, b = 2) => a + b;
    const extraSum = (fun) => fun() * fun();
    const sumFun = () => sum();

    expect(extraSum(() => sumFun())).toBe(1);
    expect(extraSum(sumFun)).toBe(1);
  });

  describe("operator speard", () => {
    it("zamiana argumentów na tablice", () => {
      const f = (a, b, c, ...args) => args.map((el) => el + a + b + c);
      expect(f(1, 2, 3, "a", "b", "c", { a: 1, b: 2 })).toEqual([
        "a123",
        "b123",
        "c123",
        "[object Object]123",
      ]);
    });

    it("usuwanie z obiektu pewnych pól", () => {
      const obj1 = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      };

      const { a, b, ...obj2 } = obj1;
      expect(obj2).toEqual({ c: 3, d: 4 });
      expect(a).toEqual(1);
      expect(b).toEqual(2);
    });

    it("łaczenie obiektów", () => {
      const obj1 = {
        a: 1,
        b: 2,
      };
      const obj2 = {
        c: 3,
        d: 4,
      };
      const obj3 = { ...obj1, ...obj2 };
      expect(obj3).toEqual({ a: 1, b: 2, c: 3, d: 4 });
    });

    it("łaczenie tablic", () => {
      const arr1 = [1, 2];
      const arr2 = [3, 4];
      const arr3 = [...arr1, ...arr2];
      expect(arr3).toEqual([1, 2, 3, 4]);
    });
  });

  describe("template literal", () => {
    it("przykład", () => {
      const name = "Jan";
      const age = 20;
      const text = `Użytkownik ${name} ma ${age} lat`;
      expect(text).toBe("Użytkownik Jan ma 20 lat");
    });

    it("przykład z tablicą", () => {
      const arr = [1, 2, 3, 4, 5];
      const text = `Tablica: ${arr.join(", ")}`;
      expect(text).toBe("Tablica: 1, 2, 3, 4, 5");
    });

    it("bardziej złożony przykład", () => {
      const customer = { name: "Foo" };
      const card = { amount: 7, product: "Bar", unitprice: 42 };
      const message = `Hello ${customer.name},
want to buy ${card.amount} ${card.product} for
a total of ${card.amount * card.unitprice} bucks?`;

      expect(message).toMatchInlineSnapshot(`
"Hello Foo,
want to buy 7 Bar for
a total of 294 bucks?"
`);
    });
  });

  describe("dynamiczne przypisywanie do obiektu", () => {
    it("przykład", () => {
      const variable = "123-test";
      const obj = {
        [`${variable}-1`]: "test1",
        [`${variable}-2`]: "test2",
        [`${variable}-3`]: "test3",
      };
      expect(obj).toEqual({
        "123-test-1": "test1",
        "123-test-2": "test2",
        "123-test-3": "test3",
      });
      expect(obj[`${variable}-3`]).toBe("test3");
    });
  });
});
