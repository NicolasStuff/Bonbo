export default function (activity = {}, action) {
  if (action.type === 'sendActivityToDetail') {
    var newActivity = {}
    newActivity = action.data
    return newActivity;
  } else {
    return activity;
  }
}