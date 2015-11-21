APP.leases = {
  init: function() {
  },
  new: function() {

    c = new Calculator(6000,20, 5, 3);

    $(document).ready(function() {
      var $rent = $('#rent');
      var $term = $('#term');
      var $rate = $('#rate');
      var $period = $('#period');
      var $fixedIncrease = $('#increase-amount');
      var $fixedPeriod = $('#fixed-period');
      var $lowerBoundEnabled = $('#lower-bound-enabled');
      var $upperBoundEnabled = $('#upper-bound-enabled');
      var $lowerBound = $('#lower-bound');
      var $upperBound = $('#upper-bound');

      $term.on('change', function() {
        $('#cpiYear').replaceWith(createYearSelect(annualCPI, $term.val()));
      });

      var options = {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
      };

      var humanize = function(n) {
        return n.toLocaleString("en-US", options);
      };

      var $cpiSelect = createYearSelect(annualCPI, 10);
      $('#cpiYear').replaceWith(createYearSelect(annualCPI, $term.val()));

      $('#calculate').click(function(e) {
        e.preventDefault();
        console.log('calculating...');


        var rent = $rent.val();
        var term = $term.val();
        var rate = 1 + ($rate.val() / 100);
        var annualRent = rent*12;
        var firstAnnualRent = annualRent;
        var cpiDiscountRate = 1;
        var period = $period.val();
        var total = 0.0;
        var discountRate = 1.03;
        var presentValue = annualRent;
        var presentValueTotal = 0.0;
        var fixedIncrease = $fixedIncrease.val();
        var fixedPeriod = $fixedPeriod.val();
        var lowerBoundEnabled = $lowerBoundEnabled.is(':checked');
        var upperBoundEnabled = $upperBoundEnabled.is(':checked');
        var lowerBound = ($lowerBound.val()/100) + 1;
        var upperBound = ($upperBound.val()/100) + 1;

        var cpiStartIndex = parseInt($('#cpiYear').val(), 10);

        $('tbody tr').remove();

        var rowHtml = "<tr><td>Year %'2d</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>";
        var totalHtml = "<tr><td>Total</td><td></td><td></td><td>%s</td><td>%s</td></tr>";
        var result = "";

        var increase = "";
        var rentIncrease = "";

        var increaseType = $('input[name="increaseType"]:checked').val();


        //this loop is awkward
        for (var i=1; i<=term; ++i) {
          result += sprintf(rowHtml, i, increase, humanize(rentIncrease), humanize(annualRent), humanize(presentValue));
          total += annualRent;
          presentValueTotal += presentValue;

          if (i==term) break; //don't calculate increases for last year;

          increase = ""; rentIncrease = "";

          if (increaseType == 'fixed-percentage') {
            if (i%period == 0) {
              var newRent = annualRent*rate;
              rentIncrease = (newRent-annualRent)/12;
              annualRent = newRent;
              increase = ((rate-1)*100).toLocaleString("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1});
            }
            presentValue = annualRent/Math.pow(discountRate, i);

          } else if (increaseType == 'cpi') {
            if (i%period==0) {
              // iterator index starts at 1, so we subtract one for index into annualCPI
              var cpiMultiplier = annualCPI[cpiStartIndex+i-1][2];
              if (lowerBoundEnabled && cpiMultiplier < lowerBound) {
                cpiMultiplier = lowerBound;
              }
              if (upperBoundEnabled && cpiMultiplier > upperBound) {
                cpiMultiplier = upperBound;
              }
              var newRent = annualRent*cpiMultiplier;
              rentIncrease = (newRent-annualRent)/12;
              annualRent = newRent;
              presentValue = annualRent/Math.pow(discountRate, i);

              //cpiDiscountRate = cpiDiscountRate * annualCPI[cpiStartIndex+i-1][2];
              //presentValue = annualRent/cpiDiscountRate;
              increase = (annualCPI[cpiStartIndex+i-1][3]*100).toLocaleString("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1});
              //increase += " (" + annualCPI[cpiStartIndex+i-1][0] +")";
            }
          } else if (increaseType = 'fixed-amount') {
            if (i%fixedPeriod == 0) {
              var newRent = annualRent+(fixedIncrease*12);
              rentIncrease = fixedIncrease;
              increase = ((fixedIncrease*12/annualRent)*100).toLocaleString("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1});
              annualRent = newRent;
            }
            presentValue = annualRent/Math.pow(discountRate, i);
          }

        }

        result += sprintf(totalHtml, humanize(total), humanize(presentValueTotal));

        $('tbody').append(result);


      });
    });
  }
}