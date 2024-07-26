import express from "express";

const app = express()

app.get("/",(req,res)=>
{
    res.send("Hello to server")
})
app.get('/api',(req,res)=>
{
    console.log(req.query.id)
    res.send(req.query.id)
})
app.listen(3000,()=>
{
    console.log("Server is running on 3000")
})