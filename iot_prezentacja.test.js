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
      expect(counter).toBe(100);
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

    // .bind zwraca nową funkcję z przypisanym kontekstem, czyli this
    // nie zmienia oryginalnej funkcji
    // można przekazać argumenty do funkcji
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

    // .call wywołuje funkcję z przypisanym kontekstem, czyli this
    // nie zmienia oryginalnej funkcji
    // można przekazać argumenty do funkcji
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

    // .apply wywołuje funkcję z przypisanym kontekstem, czyli this, ale argumenty muszą być przekazane w tablicy
    // nie zmienia oryginalnej funkcji
    // można przekazać argumenty do funkcji
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

describe("5. This", () => {
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
      expect(fun()).toBe("Hello undefined"); // -> sayHello.call(this)
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

  describe.skip("zadania", () => {
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
