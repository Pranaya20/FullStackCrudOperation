const express = require("express")

const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2")
const cors = require("cors");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database:"crud-contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet,(err, result)=>{
        res.send(result);
        console.log("error:-",err);
    })
})

app.post("/api/post",(req,res)=>{
    const {name,email,contact} = req.body;
    const sqlInsert = "insert into contact_db(name,email,contact) values (?,?,?)";
    db.query(sqlInsert,[name,email,contact],(error,result)=>{
        res.send(result)
        if(error){
            console.log(error);
        }
    })
})

app.delete("/api/remove/:id",(req,res)=>{
    const {id} = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove,id,(error,result)=>{
        res.send(result)
        if(error){
            console.log(error);
        }
    })
})

app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT * FROM contact_db wHERE id = ?";
    db.query(sqlGet,id,(error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})

app.put("/api/update/:id",(req,res)=>{
    const {id} = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate,[name, email, contact, id],(error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})


app.get("/",(req,res)=>{
    // const sqlInsert = "insert into contact_db(name,email,contact) values ('pranaya','patropranaya@gmail.com',9438490285)";
    //  db.query(sqlInsert,(err, result)=>{
    //     console.log("error:-",err);
    //     console.log("result:-",result);
    //     res.send("Hello world");
    //  })
})

app.listen(5000,()=>{
    console.log("server is running at 5000");
})
