export default function (login = {}, action) {
  if (action.type === 'SignIn') {
    var newLogin = {}
    newLogin = action.login
    console.log("newLogin", newLogin)
    return newLogin;
  } else {
    return login;
  }
}