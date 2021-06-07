let users = [{"firstName":"Havva","lastName":"Yildiz","email":"havvak@yahoo.com","password":"1234","role":"admin"}]


export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('req', req.body)
    users = [...users, req.body]
    console.log(':users', users)
  } else {
    // Handle any other HTTP method
  }
  res.status(200).json(users)
}

