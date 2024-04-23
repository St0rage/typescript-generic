describe("no generic", () => {
  class Data {
    value: any;

    constructor(value: any) {
      this.value = value;
    }
  }

  it("should accept all values", async () => {
    const data = new Data("Dani");

    // data.value = 100;

    console.info(data.value.toUpperCase());
  });
});
