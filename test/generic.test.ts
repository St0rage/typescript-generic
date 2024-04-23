describe("generic", () => {
  class GenericData<T> {
    value: T;

    constructor(value: T) {
      this.value = value;
    }

    get(): T {
      return this.value;
    }

    set(value: T) {
      this.value = value;
    }
  }

  it("should support multiple data type", async () => {
    const dataNumber = new GenericData<number>(123);

    // otomatis error karena tipe datanya number
    // dataNumber.value = "Dani";
    // dataNumber.value = true;

    expect(dataNumber.value).toBe(123);

    const dataString = new GenericData<string>("Dani");

    // otomotatis error karena tipe data nya string
    // dataString.value = 123;
    // dataString.value = true;

    const upper = dataString.value.toUpperCase();
    expect(upper).toBe("DANI");
  });

  function create<T>(value: T): T {
    return value;
  }

  it("should support function generic", async () => {
    const result: string = create<string>("Dani");
    expect(result).toBe("Dani");

    const result2: number = create<number>(123);
    expect(result2).toBe(123);
  });

  class Entry<K, V> {
    constructor(public key: K, public value: V) {}
  }

  class Triple<K, V, T> {
    constructor(public first: K, public second: V, public third: T) {}
  }

  it("should support multiple generic type", async () => {
    const entry = new Entry<number, string>(1, "Hello");
    expect(entry.key).toBe(1);
    expect(entry.value).toBe("Hello");

    const triple = new Triple<number, string, boolean>(1, "Hello", true);
    expect(triple.first).toBe(1);
    expect(triple.second).toBe("Hello");
    expect(triple.third).toBe(true);
  });

  it("should support optional type", async () => {
    const entry = new Entry(1, "Hello");
    expect(entry.key).toBe(1);
    expect(entry.value).toBe("Hello");
  });

  class SimpleGeneric<T = number> {
    private value?: T;

    setValue(value: T) {
      this.value = value;
    }

    getValue(): T | undefined {
      return this.value;
    }
  }

  it("should create simple generic", async () => {
    const simple = new SimpleGeneric<string>();
    simple.setValue("Dani");
    // simple.setValue(100);
    // simple.setValue(true);

    expect(simple.getValue()!.toUpperCase()).toBe("Dani");
  });

  interface Employee {
    id: string;
    name: string;
  }

  interface Manager extends Employee {
    totalEmployee: number;
  }

  interface VP extends Manager {
    totalManager: number;
  }

  class EmployeeData<T extends Employee> {
    constructor(public employee: T) {}
  }

  it("should support constraint", async () => {
    const data1 = new EmployeeData<Employee>({
      id: "100",
      name: "Dani",
    });
    const data2 = new EmployeeData<Manager>({
      id: "100",
      name: "Dani",
      totalEmployee: 100,
    });
    const data3 = new EmployeeData<VP>({
      id: "100",
      name: "Dani",
      totalEmployee: 100,
      totalManager: 10,
    });

    // const data4 = new EmployeeData<string>("Dani");
    // const data5 = new EmployeeData<number>(100);
  });

  it("should support array", async () => {
    const array = new Array<string>();

    array.push("Dani");
    array.push("Yudistira");

    expect(array[0]).toBe("Dani");
    expect(array[1]).toBe("Yudistira");
  });

  it("should support set", async () => {
    const set = new Set<string>();

    set.add("Dani");
    set.add("Yudistira");
    set.add("Maulana");

    expect(set.size).toBe(3);
    expect(set.has("Dani")).toBe(true);
    expect(set.has("Yudistira")).toBe(true);
  });

  it("should support map", async () => {
    const map = new Map<string, number>();

    map.set("Dani", 100);
    map.set("Dian", 90);

    expect(map.get("Dani")).toBe(100);
    expect(map.get("Dian")).toBe(90);
  });

  async function fetchData(value: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (value == "Dani") {
          resolve("Hello " + value);
        } else {
          reject("Not Found");
        }
      }, 1000);
    });
  }

  it("should support promies", async () => {
    const result = await fetchData("Dani");
    expect(result.toUpperCase()).toBe("HELLO DANI");

    try {
      await fetchData("Dian");
    } catch (e) {
      expect(e).toBe("Not Found");
    }
  });
});
