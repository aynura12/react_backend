const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const {v4:uuiddv4}=require("uuid")
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let users = [
  { id: 0, name: "Umut", age: 1 },
  {
    id: 1,
    name: "Omer",
    age: 5,
  },
];
//get all users
app.get("/users", (req, res) => {
  res.json({
    success: true,
    quantity: users.length,
    data: users,
  });
});

//get user by id
app.get("/users/:id", (req, res) => {
  const id = +req.params.id;
  const user = users.find((u) => u.id === idCounter);
  if (!user) {
    return res.json({
      success: false,
    });
  }
  res.json({ success: true, data: user });
});
let idCounter = 2;

//Add users
app.post("/users", (req, res) => {
    const id=uuiddv4()
  const newUser = { ...req.body, id: idCounter};
  users = [...users, newUser];
  res.json({
    success: true,
    data: users,
  });
});


//DElete users
app.delete("/users/:id",(req,res)=>{
const id=+req.params.id;
users=users.filter(u=>u.id!=id)
res.json({
    success:true,
    data:users, 
})
})

//Update users
app.put("/users/:id",(req,res)=>{
    const id=+req.params.id;
   users= users.filter(u=>u.id!==id)
   const updateUser={
    id:id,
    name:req.body.name,
    age:req.body.age,
   };
   users.push(updateUser )
   res.json({
    success:true 
   })
})



const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server on the port",${PORT}`);
});
