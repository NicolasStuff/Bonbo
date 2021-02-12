export default function(idUser='', action) {
    if(action.type === 'addId') {
        var newIdUser 
        newIdUser = action.idUser
        console.log("REDUCEUR newIdUser", newIdUser)
      return newIdUser;
    } else {
      return idUser;
    }
  }