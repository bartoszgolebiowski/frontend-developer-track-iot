const fs = require("fs");
const fetch = require("cross-fetch");

const words = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent venenatis dictum sem at laoreet. Fusce at tempus leo. In ultrices dolor et tortor lacinia, vitae finibus velit fermentum. Vestibulum elementum non nulla ac aliquet. Integer convallis pharetra risus, id bibendum metus ornare eget. Mauris commodo elit nec malesuada lobortis. Fusce rhoncus pellentesque odio nec dapibus.
Vestibulum nec erat eget leo varius molestie ac sed lorem. Proin euismod sollicitudin sapien, vel dictum diam venenatis sed. Nulla bibendum ac arcu nec luctus. Donec lacinia pulvinar mattis. Curabitur tempus vulputate erat, id luctus quam gravida et. Cras lectus mauris, feugiat quis egestas et, semper in nunc. Donec non lacus lacinia, molestie justo sit amet, faucibus mauris. Praesent euismod tincidunt libero vitae gravida. Mauris congue eget tortor eget euismod. Sed quis sapien non dui sodales rhoncus in ac urna. Cras convallis lorem nec elit iaculis dapibus. Nunc eget tortor felis. Vivamus malesuada, velit eu laoreet bibendum, urna libero malesuada lacus, eu iaculis mauris quam quis odio. Curabitur tincidunt augue faucibus, imperdiet metus in, varius orci. Vivamus ac elit vel lorem bibendum facilisis quis at magna. Praesent at erat est.
Donec faucibus orci elit, et ullamcorper nisl tincidunt eget. Curabitur tincidunt gravida lacus vel commodo. Sed ligula erat, efficitur in dolor vel, tincidunt euismod orci. Fusce mattis arcu a ex ornare, quis dapibus mauris vestibulum. Mauris molestie fringilla urna, eu dapibus ligula consequat eu. Cras tristique tempor neque, vitae molestie purus hendrerit vitae. Nam auctor purus vel sagittis ullamcorper. Maecenas eget purus non eros iaculis rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed hendrerit odio elementum arcu fringilla aliquet. Vivamus vitae lectus a lectus sollicitudin malesuada. Nunc varius, mi at mattis ullamcorper, elit libero eleifend eros, in tempus augue purus eget enim. Curabitur sed varius diam.
Proin eget maximus enim, at pharetra lorem. Maecenas non odio viverra est iaculis placerat. Quisque varius blandit hendrerit. Quisque consequat, sem et rutrum cursus, nisl massa varius nisi, non consequat velit enim non mauris. Duis at nulla non urna rutrum sollicitudin non ut orci. Nullam risus turpis, accumsan eu velit ac, tincidunt vehicula turpis. Curabitur imperdiet augue volutpat dapibus tristique. Nullam luctus aliquet fermentum.
Nulla at iaculis augue. Vestibulum pellentesque dolor a tellus consectetur ornare. Donec libero nisl, semper in ornare a, pretium in nunc. Donec vel magna ut ex imperdiet ornare. Nulla at tristique eros. Fusce id magna cursus, egestas felis id, bibendum metus. Vestibulum imperdiet sollicitudin eros, id lacinia metus porttitor id. Donec ornare nisi nunc, sed pellentesque nulla tristique nec. Mauris porta ex quis neque consectetur pharetra.
`.split(" ");

const words2 = `
Etiam fermentum dignissim augue, eget blandit nibh tristique et. Praesent justo risus, vulputate volutpat ipsum nec, tristique placerat neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed sed volutpat enim. Aliquam sit amet tempor diam. Phasellus sed laoreet ipsum, ac dictum ligula. Aliquam suscipit a velit vel faucibus. Fusce sit amet egestas eros, ac iaculis elit. Aenean semper consequat tellus id efficitur. Proin augue est, gravida et libero ut, pulvinar viverra dolor. Duis sit amet ex aliquam, ultrices diam nec, malesuada nulla. Integer ac maximus velit. Duis aliquam ultrices placerat. Integer at laoreet nibh, non dictum mauris. Etiam hendrerit iaculis mattis. Integer quis nibh aliquam dui sagittis suscipit.
Vestibulum pharetra, mauris sit amet mattis tristique, sem metus pretium lorem, ut bibendum neque lectus quis urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas placerat fringilla egestas. Vivamus laoreet sem et arcu eleifend dictum. Morbi finibus nibh ut eros pellentesque, hendrerit volutpat tellus laoreet. Cras ipsum ipsum, imperdiet nec pulvinar non, dignissim at massa. Proin dui eros, pellentesque nec rutrum et, porttitor in diam. Sed vitae placerat dui. Pellentesque nec faucibus tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere interdum metus. Quisque scelerisque maximus enim in dignissim. Nulla imperdiet dictum purus, at sodales neque fermentum eget. Morbi pellentesque ultrices est sed sodales.
Donec eu massa ullamcorper, sagittis enim at, imperdiet mi. Praesent interdum sagittis leo, nec luctus neque facilisis et. Cras consectetur dui nisl, non faucibus ipsum dictum in. Aliquam nulla sapien, laoreet sit amet magna eu, pharetra dignissim ante. Morbi consequat quam vitae pulvinar tristique. Cras vitae posuere urna. Nam rutrum erat ultrices ante ultricies, non dapibus orci commodo. Fusce ultricies lacus quis rutrum scelerisque. Pellentesque sit amet nunc urna. Ut in elit in sem consectetur imperdiet a ut erat. Nulla tristique vel nisi et porttitor. Nunc molestie risus eu nunc tincidunt ullamcorper a sed sem. Nunc feugiat massa risus, at tempor enim vestibulum ut.
Quisque velit elit, varius ut scelerisque ut, efficitur vel risus. Vestibulum non cursus augue. Cras et dui eget metus ultricies gravida cursus ut neque. Sed sollicitudin diam vitae diam blandit, ac feugiat sapien bibendum. Phasellus blandit quam vitae lorem sollicitudin, non imperdiet quam molestie. Donec erat dui, gravida venenatis lectus et, posuere mollis elit. Etiam lacus felis, semper id ante id, imperdiet porttitor erat. Praesent nunc massa, iaculis sed bibendum sit amet, mattis sed odio. Praesent vitae vulputate lorem. Aliquam eu laoreet mauris. Sed sit amet ipsum lacinia ipsum euismod scelerisque a nec nulla. Nulla gravida elit in elit egestas accumsan. Quisque ac dolor imperdiet enim eleifend pharetra. Praesent ac nibh orci. Donec pharetra egestas pretium.
Vivamus euismod vel ex a volutpat. Curabitur cursus pharetra ex, eget accumsan nibh luctus tristique. Vestibulum luctus risus ut consectetur aliquet. Ut congue dolor mauris, quis ultrices lectus mollis nec. Fusce ac arcu imperdiet, rutrum erat a, venenatis lorem. In finibus felis vel congue bibendum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas interdum, nulla nec aliquam varius, arcu sem posuere tortor, id hendrerit dui tellus non neque. In diam turpis, egestas ut consectetur porttitor, consequat quis diam. Curabitur porta ut arcu quis euismod. Fusce vitae metus non ipsum vulputate malesuada eu ut leo. Donec feugiat rutrum mi non bibendum. Praesent eu fringilla dui.
`.split(" ");

describe("zadania", () => {
  describe.skip("Map", () => {
    it("API", () => {
      const map = new Map();
      const key = {
        a: 1,
        b: 2,
      };
      const symbol = Symbol("SYMBOL");
      map.set("1", 1);
      map.set(key, 2);
      map.set(3, 3);
      map.set(symbol, 4);
      map.set(5, [1, 2, 3, 4, "123", {}, undefined, null]);

      expect(map.size).toBe(5);
      expect(map.get("1")).toBe(1);
      expect(map.get(key)).toBe(2);
      expect(map.get(3)).toBe(3);
      expect(map.get(symbol)).toBe(4);
      expect(map.get("SYMBOL")).not.toBe(4);

      const map2 = new Map();

      for (const [key, value] of map) {
        map2.set(key, value);
      }

      map.forEach((value, key, map) => {
        // console.log(`map.get('${key}') = ${value}`);
      });

      for (const [key, value] of map2.entries()) {
        //console.log(key, value);
      }

      for (const key of map2.keys()) {
        //  console.log(key);
      }

      for (const value of map2.values()) {
        //  console.log(value);
      }

      expect(map2.size).toBe(5);
      expect(map2.get("1")).toBe(1);
      expect(map2.get(key)).toBe(2);
      expect(map2.get(3)).toBe(3);
      expect(map2.get(symbol)).toBe(4);
      expect(map2.get("SYMBOL")).not.toBe(4);

      map2.clear();
      expect(map2.size).toBe(0);
      expect(map2.get("1")).not.toBe(1);
      expect(map2.get(key)).not.toBe(2);
      expect(map2.get(3)).not.toBe(3);
      expect(map2.get(symbol)).not.toBe(4);

      const map3 = new Map();
      map3.set(5, 5);
      const mergedMap = new Map([...map, ...map3]);
      expect(mergedMap.size).toBe(5);
      expect(mergedMap.get("1")).toBe(1);
      expect(mergedMap.get(key)).toBe(2);
      expect(mergedMap.get(3)).toBe(3);
      expect(mergedMap.get(symbol)).toBe(4);
      expect(mergedMap.get("SYMBOL")).not.toBe(4);
      expect(mergedMap.get(5)).toBe(5);

      expect(mergedMap.has(5)).toBeTruthy;
      expect(mergedMap.has("SYMBOL")).toBeFalsy;
      mergedMap.delete(5);
      expect(mergedMap.has(5)).toBeFalsy;
    });

    it(`Stworz dwie tablice, 
        pierwsza tablica dla wszystkich wartości mapy true, 
        druga tablica dla wszystkich wartosci mapy false`, () => {
      const trueArr = [];
      const falseArr = [];
      const map = new Map();
      map.set(1, true);
      map.set(2, false);
      map.set(3, true);
      map.set(4, false);
      map.set(5, false);
      map.set(6, false);
      map.set(7, false);
      map.set(8, true);

      expect(trueArr).toEqual([true, true, true]);
      expect(falseArr).toEqual([false, false, false, false, false]);
    });

    it("stówrz tablice, gdzie klucze to wyrazy, a value to ilość powtórzeń", () => {
      // uzyj zmiennej words
      const map = new Map();

      expect(map.get("lorem.")).toBe(2);
      expect(map.get("lorem")).toBe(2);
      expect(map.get("et")).toBe(4);
    });

    it("wyznacz najczęsciej powtarzany wyraz, oraz podaj jego ilość powtórzeń", () => {
      // uzyj zmiennej words
      let secondMostFrequent = "";
      let secondMostFrequentCount = 0;
      const map = new Map();

      //przypisz wyniki do zmiennych
      expect(secondMostFrequent).toBe("at");
      expect(secondMostFrequentCount).toBe(9);
    });

    it("stwórz cache dla którego kolejność argumentów ma znaczenie", () => {
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
      expect(counter).toBe(6);
    });

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

  describe.skip("Set", () => {
    it("API", () => {
      const setFromArray = new Set([1, 2, 3, 4, 5]);
      const set = new Set();
      set.add(42);
      set.add(42);
      set.add(13);
      set.add(14);
      set.add(15);
      set.add({ a: 1, b: 2 });

      //   moze byc inna kolejnosc dla kluczy
      for (const [value, sameValue] of set.entries()) {
        expect(value).toBe(sameValue);
      }

      //   moze byc inna kolejnosc dla kluczy
      for (const value of set.values()) {
        console.log(key);
      }

      //   moze byc inna kolejnosc dla kluczy
      set.forEach((key) => {
        console.log(key);
      });

      // tworzenie tablicy z obiektu Set
      const arrayFromSet = Array.from(set);
      const arrayFromSet2 = Array.from(set.values());
      const arrayFromSet3 = [...set];
      const arrayFromSet4 = Array.from(set.entries()).map((el) => el[0]);

      expect(set.size).toBe(5);
      expect(set.has(42)).toBeTruthy;
      expect(set.has(13)).toBeTruthy;
      expect(set.has(14)).toBeTruthy;
      expect(set.has(15)).toBeTruthy;

      set.delete(42);
      expect(set.size).toBe(4);
      expect(set.has(42)).toBeFalsy;
      expect(set.has(13)).toBeTruthy;
      expect(set.has(14)).toBeTruthy;
      expect(set.has(15)).toBeTruthy;

      set.clear();
      expect(set.size).toBe(0);
      expect(set.has(42)).toBeFalsy;
      expect(set.has(13)).toBeFalsy;
      expect(set.has(14)).toBeFalsy;
      expect(set.has(15)).toBeFalsy;
    });

    it("oblicz ilość unikalnych wyrazów", () => {
      // uzyj zmiennej words
      const set = new Set();

      expect(set.size).toBe(215);
    });

    it("wyznacz ilość wspólnych wyrazów dla dwóch fragmentów tesktu", () => {
      // uzyj zmiennej words i words2
      const set = new Set();
      const set2 = new Set();
      const intersection = new Set();

      expect(intersection.size).toBe(152);
    });

    it("wyznacz ilość rozłącznych wyrazów dla dwóch fragmentów tesktu", () => {
      // uzyj zmiennej words i words2
      const set = new Set();
      const set2 = new Set();
      const diff = new Set();
      const diff2 = new Set();

      expect(diff.size).toBe(63);
      expect(diff2.size).toBe(96);
    });
  });

  describe.skip("Class", () => {
    it(`składanie tablicy i jej dodawanie
        Wizualizacja jednej iteracji składania tablicy:

        dla nieparzystej ilości elementów:
         Krok 1         Krok 2        Krok 3       Krok 4       Krok 5
                             5/           5|         5\          
                            4/            4|          4\      
        1 2 3 4 5      1 2 3/         1 2 3|       1 2 3\       6 6 3
        ----*----      ----*          ----*        ----*        ----*

        dla parzystej ilości elementów:
         Krok 1     Krok 2        Krok 3       Krok 4     Krok 5
                        5/            5|         5\          
                        4/            4|          4\      
        1 2 4 5      1 2           1 2         1 2         6 6 
      `, () => {
      class FoldHelper {
        constructor(collection) {
          this.foldCount = 0;
          this.initial = collection;
          this.collection = collection;
        }

        fold() {}
        getInitial() {}
        getFoldCount() {}
      }

      const foldHelper = new FoldHelper([1, 2, 3, 4, 5]);
      const foldHelper2 = new FoldHelper([-9, 9, -8, 8, 66, 23]);

      expect(foldHelper.fold()).toEqual([6, 6, 3]);
      expect(foldHelper.fold()).toEqual([9, 6]);
      expect(foldHelper.fold()).toEqual([15]);
      expect(foldHelper.getInitial()).toEqual([1, 2, 3, 4, 5]);
      expect(foldHelper.getFoldCount()).toBe(3);

      expect(foldHelper2.fold()).toEqual([14, 75, 0]);
      expect(foldHelper2.getInitial()).toEqual([-9, 9, -8, 8, 66, 23]);
      expect(foldHelper2.getFoldCount()).toBe(1);
    });

    it(`stworz klase PaginationHelper
        która będzie przechowywała dane o ilości stron
        oraz będzie miała metody:
        - getPageCount() - zwraca ilość stron
        - getItemCount() - zwraca ilość wszystkich elementów
        - getPageItemCount(page) - zwraca ilość elementów na stronie, gdy strona nie istnieje zwraca -1
        - getItemPage(itemIndex) - zwraca strone dla itemIndex elementu, gdy itemIndex nie istnieje zwraca -1
      `, () => {
      class PaginationHelper {
        constructor(collection, itemsPerPage) {
          this.collection = collection;
          this.itemsPerPage = itemsPerPage;
          this.pages = Math.ceil(collection.length / itemsPerPage);
        }

        getItemCount() {}
        getPageCount() {}
        getPageItemCount(page) {}
        getItemPage(itemIndex) {}
      }

      const helper = new PaginationHelper(["a", "b", "c", "d", "e", "f"], 4);

      expect(helper.getPageCount()).toBe(2);
      expect(helper.getItemCount()).toBe(6);
      expect(helper.getPageItemCount(0)).toBe(4);
      expect(helper.getPageItemCount(1)).toBe(2);
      expect(helper.getPageItemCount(2)).toBe(-1);
      expect(helper.getItemPage(5)).toBe(1);
      expect(helper.getItemPage(2)).toBe(0);
      expect(helper.getItemPage(20)).toBe(-1);
      expect(helper.getItemPage(-10)).toBe(-1);
    });
  });

  describe.skip("Promise", () => {
    const delayAndResolve = (ms, value) =>
      new Promise((resolve) => setTimeout(resolve(value), ms));
    const delayAndReject = (ms, value) =>
      new Promise((resolve, reject) => setTimeout(reject(value), ms));

    const throwErrorAsyncFun = async (error) => {
      setTimeout(() => {
        throw new Error(error);
      }, 1000);
    };

    const delay1000ms = (value) => delayAndResolve(1000, value);
    const delay2000ms = (value) => delayAndResolve(2000, value);
    const delay500msAndThrowError = (value) => delayAndReject(500, value);

    it.skip("API", (done) => {
      // test bedzie trwac 5 sekund,
      // potrzebne na potrzeby testów, które wymagają czekania
      delayAndResolve(4900, "").then(() => {
        done();
      });

      delay1000ms("a").then((res) => {
        //po 1000ms powinno byc "a"
        expect(res).toBe("a");
      });
      delay2000ms("b").then((res) => {
        //po 2000ms powinno byc "b"
        expect(res).toBe("b");
      });

      // chainowanie promisów
      delay1000ms("B")
        .then((res) => {
          return delay1000ms(res + "C");
        })
        .then((res) => delay1000ms(res + "D"))
        .then((res) => {
          expect(res).toBe("BCD");
        });

      delay500msAndThrowError("c").catch((err) => {
        //po 500ms powinno byc "c", promise rejected
        expect(err).toBe("c");
      });
      throwErrorAsyncFun("d").catch((err) => {
        expect(err.message).toBe("d");
      });

      Promise.all([delay1000ms(1), delay1000ms(2), delay2000ms("TEST")]).then(
        ([a, b, c]) => {
          expect(a).toBe(1);
          expect(b).toBe(2);
          expect(c).toBe("TEST");
        }
      );

      Promise.all([
        delay1000ms(1),
        delay500msAndThrowError("TEST1"),
        delay1000ms(1),
      ]).catch((err) => {
        expect(err).toBe("TEST1");
      });

      Promise.any([
        delay1000ms(1),
        delay500msAndThrowError("TEST1"),
        delay2000ms(2),
      ]).then((res) => {
        expect(res).toBe(1);
      });

      Promise.any([
        delay500msAndThrowError("TEST1"),
        delay500msAndThrowError("TEST2"),
        delay500msAndThrowError("TEST3"),
      ]).catch((res) => {
        expect(res.message).toBe("All promises were rejected");
      });

      Promise.race([delay1000ms(1), delay2000ms(62)]).then((res) => {
        expect(res).toBe(1);
      });
    });

    it("ile wyrazów znajduję się w pliku lorem.txt", (done) => {
      //fs.promises.readFile, funkcja do czytania plikow wykorzystująca promise.

      Promise.resolve("").then((data) => {
        let wordsQuantity = 0;
        expect(wordsQuantity).toBe(424);
        done();
      });
    });

    it("Zapisz 10 liczb do pliku temp.txt", (done) => {
      //fs.promises.writeFile, funkcja do zapisywania danych do pliku wykorzystująca promise.

      Promise.resolve().then((data) => {
        //tutaj nie ma asercji, prosze samemu zobaczyć jakie dane zostana zapisane
        done();
      });
    });

    it("Wykonaj request do https://httpbin.org/post", (done) => {
      // "data" jest to obiekt zawierajacy dane do wyslania
      // wskazówka 1 ->drugi argument w funkcji fetch powinien być zamieniony na stringa metoda "JSON.stingify(data)"
      // wskazówka 2 -> po otrzymaniu danych zwracany obiekt to nie jest JSON, dopiero nalezy go zmienic na JSON "res.json()"
      // API https://github.com/node-fetch/node-fetch
      const data = {
        firstName: "John",
        lastName: "Snow",
      };

      Promise.resolve().then(({ json }) => {
        expect(json.firstName).toBe("John");
        expect(json.lastName).toBe("Snow");
        done();
      });
    });

    it("Wykonaj request do https://httpbin.org/post, response zapisz w pliku response.json", (done) => {
      // "data" jest to obiekt zawierajacy dane do wyslania
      // wskazówka 1 ->drugi argument w funkcji fetch powinien być zamieniony na stringa metoda "JSON.stingify(data)"
      // wskazówka 2 -> po otrzymaniu danych zwracany obiekt to nie jest JSON, dopiero nalezy go zmienic na JSON "res.json()"
      // API https://github.com/node-fetch/node-fetch
      const data = {
        firstName: "John",
        lastName: "Snow",
      };
    });
  });
});
