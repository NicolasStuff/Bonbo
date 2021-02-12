export default function(picture = {}, action) {
    //action correspond à l'object reçu
    if(action.type === 'AddPicture') {
        var newPicture = {}
        newPicture = action.newPicture
      return newPicture;
    } else {
      return picture;
    }
  }