// monthly rent
// term in years
function Calculator (rent, term, rate, period) {
  this.rent = rent;
  this.term = term;
  this.rate = 1 + (rate/100);
  this.period = period;

  this.periods;
  this.total;

  this.increaseType;
}

Calculator.prototype.annualRent = function() {
  return this.rent * 12;
}

Calculator.prototype.calculate = function() {
  var annualRent = this.annualRent();

  var results = [];

  for (var i=0; i< this.term; i++) {
    if ( i!=0 && i%this.period == 0) {
      annualRent = annualRent*this.rate;
    }
    results.push(annualRent);
  }
  return results;
}
