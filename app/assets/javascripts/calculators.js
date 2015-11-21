// rent   - annual rent amount
// term   - lease length in years
// amount - amount rent increases after each adjustment period
// period - number of years after which rent adjusts
function FixedCalculator (rent, term, increase, period) {
  this.rent = rent;
  this.term = term;
  this.increase = increase;
  this.period = period;
}

// returns row for each year in lease [year, annual rent, annual increase]
FixedCalculator.prototype.calculate = function() {
  var results = [];

  var annualRent = this.rent;
  for (var i=0; i< this.term; i++) {
    var increase = 0;
    if ( i!=0 && i%this.period == 0) {
      increase = this.increase;
    }
    annualRent = annualRent + increase;
    results.push({year:i+1, rent:annualRent, increase:increase});
  }
  return results;
}

function PercentageCalculator (rent, term, rate, period) {
  this.rent = rent;
  this.term = term;
  this.rate = 1 + rate/100;
  this.period = period;
}

// returns row for each year in lease [year, annual rent, annual increase]
PercentageCalculator.prototype.calculate = function() {
  var results = [];

  var annualRent = this.rent;
  for (var i=0; i< this.term; i++) {
    var rate = 1;
    var newRent = annualRent;
    if ( i!=0 && i%this.period == 0) {
      rate = this.rate;
    }
    newRent = annualRent*rate;
    results.push({year:i+1, rent:newRent, increase:newRent-annualRent});
    annualRent = newRent;
  }
  return results;
}

function CPICalculator (rent, term, period, baseYear, upperBound, lowerBound) {
  this.rent = rent;
  this.term = term;
  this.period = period;
  this.baseYear = baseYear;
  this.upperbound = upperBound;
  this.lowerBound = lowerBound;
}

// returns row for each year in lease [year, annual rent, annual increase]
CPICalculator.prototype.calculate = function() {
  var results = [];

  var annualRent = this.rent;
  for (var i=0; i< this.term; i++) {
    var rate = 1;
    var newRent = annualRent;
    if ( i!=0 && i%this.period == 0) {
      rate = this.rate;
    }
    newRent = annualRent*rate;
    results.push({year:i+1, rent:newRent, increase:newRent-annualRent});
    annualRent = newRent;
  }
  return results;
}

