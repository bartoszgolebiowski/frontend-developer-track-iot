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

    // clousers - funkcja zagnieżdżona w funkcji, która ma dostęp do zmiennych z zewnętrznej funkcji
    // dla osoby, która przyszła ze świata OOP, to clousers jest to instancja klasy.
    // plusem clousers jest to, ze nie ma potrzeby wykorzystywania słowa kluczowego this
    /*
    class Counter {
      constructor(initial) {
        this.count = initial;
      }
      add() {
        this.count++;
        return this.count;
      }
      reset() {
        this.count = initial;
        return this.count;
      }
    }
    const counterClass = new Counter(0);
    counterClass.add();
    counterClass.add();
    counterClass.add();
    expect(counterClass.counter).toBe(undefined);
    expect(counterClass.add()).toBe(4);
    expect(counterClass.reset()).toBe(0);
    */
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

    /*
    class Queue {
      constructor() {
        this.queue = [];
      }
      take(): {
        if (queue.length) {
          const currentTask = queue.pop();
          return (arg) => currentTask(arg);
        }
        return () => {};
      }
      add(task): {
        queue.push(task);
      }
    }

    const queueClass = Queue();
    let count = 0;
    queueClass.add((arg) => (count += arg));
    queueClass.add((arg) => (count += arg));
    queueClass.add((arg) => (count += arg));
    queueClass.add((arg) => (count += arg));

    queueClass.take()(12);
    expect(count).toBe(12);
    queueClass.take()(23);
    expect(count).toBe(35);
    queueClass.take()(34);
    expect(count).toBe(69);
    queueClass.take()(45);
    expect(count).toBe(114);
    queueClass.take()(45);
    queueClass.take()(45);
    queueClass.take()(45);
    */
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

    /*
    class Cache {
      constructor(func) {
        this.cache = {}; // obiekt do przechowywanie wyników
        this.func = func; // funkcja, która ma być wywołana
      }
      calc(...args) { ...args jest tablicą argumentów, czyli  calc(1,2,3,4,5) => [1,2,3,4,5], calc(1,2) => [1,2] itd.
        const key = args.join("-"); // klucz do przechowywania wyników 
        if (this.cache[key]) { // jeśli klucz istnieje w cache, to zwróć wynik
          return this.cache[key];   // jeśli klucz nie istnieje w cache, to wywołaj funkcję i zapisz wynik w cache
        }
        const result = this.func(...args); // wywołanie funkcji z argumentami i zapisanie wyniku 
        this.cache[key] = result; // zapisanie wyniku w cache
        return result; // zwrócenie wyniku
      }
    }

    let counter = 0;
    const sum = (a, b) => {
      counter++;
      return a + b;
    };

    const sumCached = Cache(sum);
    expect(sumCached.calc(1, 2)).toBe(3);
    expect(sumCached.calc(1, 3)).toBe(4);
    expect(sumCached.calc(1, 4)).toBe(5);
    expect(sumCached.calc(1, 2)).toBe(3);
    expect(sumCached.calc(1, 3)).toBe(4);
    expect(sumCached.calc(1, 4)).toBe(5);
    expect(sumCached.calc(1, 2)).toBe(3);
    expect(sumCached.calc(1, 3)).toBe(4);
    expect(sumCached.calc(1, 4)).toBe(5);
    expect(counter).toBe(3);
    */
  });

  it("dekorator", () => {
    // zamiast przekazać wszystkie argumenty do funkcji, możemy przekazać tylko część argumentów
    // i zwrócić funkcję, która będzie oczekiwała na pozostałe argumenty
    // przykład przekazywania wielu arugmentów sum(10)(20)(30)(40)
    // przykład przekazywania jednego argumentu sum(10, 20, 30, 40)
    // zaletą przekazywania wielu argumentów jest to, że możemy wywołać funkcję w dowolnym momencie
    // i przekazać kolejne argumenty
    /*
      const firstPart = sum(10);
      // do some logic here
      // const part = ...
      const secondPart = firstPart(part, part);
      // do some logic here
      // const part2 = ...
      const thirdPart = secondPart(part2);
      const result = thirdPart(40)
     */

    /*
      produkcyjny przyklad uniwersalnej funkcji do obslugi formularzy, 
      gdzie field to nazwa pola w formularzu
      gdzie event to zdarzenie, np. onChange

      const hadleChange = (field) => (event) =>{
        const { value } = event.target;
        setForm((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    */

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
        return (a, b) => {
          const result = func(a, b);
          // sprawdz czy argumenty są w cache, jeśli tak to zwróć wynik (połącz a i b w jeden klucz, np. a-b, tylko a i b zastąp wartościami)
          // jeśli nie to wywołaj funkcję i zapisz wynik w cache
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
  /*
    __proto__ i prototype to dwa różne pojęcia w JavaScript, które dotyczą dziedziczenia obiektów.
    __proto__ jest właściwością każdego obiektu, która wskazuje na jego prototyp. 
    Jest to tzw. "właściwość dziedziczenia" lub "właściwość prototypu" i pozwala na dostęp do metod i właściwości prototypu danego obiektu.
    prototype jest natomiast właściwością konstruktora (funkcji), która definiuje prototyp dla obiektów utworzonych przy użyciu tego konstruktora. 
    Właściwość ta jest automatycznie ustawiana przy tworzeniu nowej funkcji i pozwala na dziedziczenie metod i właściwości między obiektami.

    W skrócie, __proto__ jest właściwością obiektu i wskazuje na jego prototyp, natomiast prototype jest właściwością konstruktora i definiuje prototyp dla obiektów utworzonych przez ten konstruktor.
*/

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

    Medic.prototype = Object.create(Human.prototype); // Object.create tworzy nowy obiekt, który ma Human.prototype jako prototyp
    Medic.prototype.heal = function () {
      return `I am ${this.specialization}`;
    };
    const medic = new Medic("John", "Snow", "surgeon");

    expect(medic.__proto__).toBe(Medic.prototype);
    expect(medic.prototype).toBe(undefined);
    expect(Medic.prototype).not.toBe(undefined);
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

  describe.skip("zadanie 1", () => {
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

  describe.skip("zadanie 2", () => {
    // Zdefiniuj klasy

    // I. Shark
    // konstruktor przyjmuje 3 argumenty name, age, status, kazdy rekin ma 0 nog, i jest gatunku (species) shark,

    // II. Cat
    // konstruktor przyjmuje 3 argumenty name, age, status, kazdy kot ma 4 nogi, i jest gatunku (species) cat,
    // metoda introduce powinna zawierac dokladnie takie samo przywitanie jak kazde zwierze typu Animal oraz dopisek Meow meow!

    // III. Dog
    // konstruktor przyjmuje 4 argumenty name, age, status, oraz master, kazdy pies ma 4 nogi, i jest gatunku (species) dog,
    // metoda introduce powinna zawierac dokladnie takie samo przywitanie jak kazde zwierze typu Animal oraz dopisek Hellow ${master}!

    class Animal {
      constructor(name, age, legs, species, status) {
        this.name = name;
        this.age = age;
        this.legs = legs;
        this.species = species;
        this.status = status;
      }
      introduce() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
      }
    }

    describe("The Shark class", () => {
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

    describe("The Cat class", () => {
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

    describe("The Dog class", () => {
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

describe.skip("9. error handling", () => {
  it("zwykly error", () => {
    try {
      throw new Error("test123");
    } catch (e) {
      expect(e.message).toBe("test123");
    }
  });

  it("eval errror, nie uzywajcie eval!", () => {
    try {
      const str = '(9{"firstName":"Bill","lastName":"Gates"})';
      const obj = eval(str);
    } catch (e) {
      expect(e.message).toBe("Unexpected token '{'");
    }
  });

  it("Range errror", () => {
    try {
      const arr = new Array(-20);
    } catch (e) {
      expect(e.message).toBe("Invalid array length");
    }
  });

  it("Out of boundary errror", () => {
    try {
      const arr = [1, 2, 3, 4];
      const el = arr[-2];
      expect(el).toBe(undefined);
    } catch (e) {}
  });

  it("Zadanie, zamien tablice na numbery, jezeli sie nie da to -999", () => {
    const arr = [
      1,
      2,
      3,
      4,
      "abc",
      "bcd",
      "cde",
      5,
      6,
      {},
      { a: 1, b: 2 },
      [1, {}, "b"],
    ];
    expect(arr).toEqual([1, 2, 3, 4, -999, -999, -999, 5, 6, -999, -999, -999]);
  });

  it("przekaż dalej error", () => {
    try {
      try {
        throw new Error("test");
      } catch (e) {
        throw new Error("test2", { cause: e });
      }
    } catch (e) {
      expect(e.message).toBe("test2");
      expect(e.cause.message).toBe("test");
    }
  });
});

describe("10. syntax ES6", () => {
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
      const f = (a, b, c, ...rest) =>
        rest.map((singleRest) => singleRest + a + b + c);
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
      // const obj3 = Object.assign({}, obj1, obj2);
      expect(obj3).toEqual({ a: 1, b: 2, c: 3, d: 4 });
    });

    it("łaczenie tablic", () => {
      const arr1 = [1, 2];
      const arr2 = [3, 4];
      const arr3 = [...arr1, ...arr2];
      // const arr3 = [].concat(arr1, arr2);
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
