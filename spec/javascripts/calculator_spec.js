describe("FixedCalculator", function() {

  describe("#calculate", function() {
    it("should return rows for each year in lease", function() {
      calculator = new FixedCalculator(12000, 10, 0, 0);
      var results = calculator.calculate(); 
      expect(results.length).toEqual(10);
    });

    it("should increase annual rent for each adjustment period", function() {
      calculator = new FixedCalculator(12000, 10, 1000, 1);
      var results = calculator.calculate();
      expect(results[0].rent).toEqual(12000);
      expect(results[1].rent).toEqual(12000+1000);
      expect(results[9].rent).toEqual(12000+(1000*9));
    });

    it("should return increase ammount for correct adjustment period", function() {
      calculator = new FixedCalculator(12000, 10, 1000, 2);
      var results = calculator.calculate();
      expect(results[0].increase).toEqual(0);
      expect(results[1].increase).toEqual(0);
      expect(results[2].increase).toEqual(1000);
    });

    it("should only increase annual rent an adjustment anniversary", function() {
      calculator = new FixedCalculator(12000, 10, 1000, 2);
      var results = calculator.calculate();
      expect(results[0].rent).toEqual(12000);
      expect(results[1].rent).toEqual(12000);
      expect(results[2].rent).toEqual(12000+1000);
      expect(results[9].rent).toEqual(12000+(1000*4));
    });
  });
});

describe("PercentageCalculator", function() {

  describe("#calculate", function() {
    it("should return rows for each year in lease", function() {
      calculator = new PercentageCalculator(12000, 10, 0, 0);
      var results = calculator.calculate(); 
      expect(results.length).toEqual(10);
    });
  });

  it("should increase annual rent for each adjustment period", function() {
    calculator = new PercentageCalculator(12000, 10, 5, 1);
    var results = calculator.calculate();
    expect(results[0].rent).toEqual(12000);
    expect(results[1].rent).toEqual(12000+(12000*.05));
    expect(results[9].rent).toEqual(18615.938591742193);
  });

  it("should return increase ammount for correct adjustment period", function() {
    calculator = new PercentageCalculator(12000, 10, 5, 2);
    var results = calculator.calculate();
    expect(results[0].increase).toEqual(0);
    expect(results[1].increase).toEqual(0);
    expect(results[2].increase).toEqual(12000*.05);
    expect(results[8].increase).toEqual(694.5750000000007);
  });
});
