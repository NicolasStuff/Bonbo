export default function(deal={}, action) {
    if(action.type === 'sendDealtoDealDetail') {
        var newDeal = {}
        newDeal = action.deal
      return newDeal;
    } else {
      return deal;
    }
  }