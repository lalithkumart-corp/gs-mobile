import _ from 'lodash';

export const calIntValPerMonth = (thePrincipal, theInterestPercent) => {
    let principal = parseInt(thePrincipal || 0);

    let interestPercent = parseInt(theInterestPercent || 0);

    let result = 0;

    result = (principal * interestPercent)/100;

    return result;
}

export const calIntPercentPerMonth = (thePrincipal, theInterestValPerMon) => {
    let interestValPerMonth = parseInt(theInterestValPerMon || 0);
    let principal = parseInt(thePrincipal || 0);
    return (100 * interestValPerMonth)/principal;
}

export const calcInterestPercent = (thePrincipal, interestRatesDB, itemCategory) => {
    let interestPercent = 0;
    let principal = parseInt(thePrincipal || 0);
    if(itemCategory) {
        _.each(interestRatesDB, (aRateObj, index) => {
            if(itemCategory == aRateObj.type && principal >= aRateObj.range_from && principal <= aRateObj.range_to ) {
                interestPercent = aRateObj.rate_of_interest;
            }
        });
    }
    interestPercent = parseFloat(interestPercent.toFixed(2));
    return interestPercent;
}

export const textInputFormat = (val) => {    
    if(typeof val == "number")
        val = val.toString();
    if(val == 0 || val == null || val == undefined)
        val = "";
    return val;
}