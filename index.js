import express from 'express'

const app=express()

const port =3000
const hostname='127.0.0.1'



app.use(express.json());

let teaData=[]
let indexofTea=0

app.post('/teas',(req,res)=>{
    
    let {name,price} = req.body
    teaData.push({id:indexofTea++,name:name,price:price})
    res.status(200).send(teaData)
})

app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

app.get('/teas/:id',(req,res)=>{
    const tea=teaData.find(t=> t.id === Number(req.params.id))
    if (!tea) {
        return res.status(404).send("tea not found")
    }else{
        return res.status(200).send(tea)
    }
})

app.put('/teas/:id',(req,res)=>{
    teaData.forEach(t=>{
        if (t.id === Number(req.params.id)) {
            const {name,price}=req.body
            t.name=name
            t.price=price
            console.log("hello");
            
            return res.status(200).send(teaData)
        }
    })
    
})

app.delete('/teas/:id',(req,res)=>{
    teaData=teaData.filter(t => t.id !==Number(req.params.id) ? t : null)
    return res.status(200).send(teaData)
})



app.listen(port,hostname,()=>{
    console.log("server is listeneni");
    
})