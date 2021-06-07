
let users = [{"firstName":"Havva", "lastName":"Yildiz", "email":"havvak@yahoo.com", "password":"1234", "role":"admin"}]



function checkCredential(users, email, password){
  console.log(":::users", users);
  return users.find(user => user.email === email && user.password === password);
}


export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log(req.body);

    const userToLogin = checkCredential(users, email, password);

    if(userToLogin) {
      console.log("logged in")
      res.status(200).send({
        message: '',
        email: userToLogin.email,
        password: userToLogin.password,
      })
    } else if (!userToLogin) {
      res.status(401).send({
        message: 'Username or password not recognized',
        status: "401"
      })
    }
  }
}

