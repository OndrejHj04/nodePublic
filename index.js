const express = require('express')
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

const Customer = require("./models/customers")

dotenv.config()
mongoose.set('strictQuery', false)
const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3000
const connection = process.env.CONNECTION
app.get('/', (req, res) => {
  res.send({msg: "Welcome"})
})

app.get('/api/customers', async (req, res) => {
    try {
        const restult = await Customer.find()
        res.send({"customers": restult})    
    }catch(e){
        res.status(500).json({error: e.message})
    }
})


app.post("/api/customers", async (req,res)=>{
    const customer = new Customer(req.body)
    
    try{
        await customer.save()
        res.status(201).json({customer})
    }catch(e){
        res.status(400).json({error: e.message})
    }
    
})


app.get("/api/customers/:id", async(req, res)=>{
    const {id} = req.params

    try{
        const customer = await Customer.findById(id)
        if(!customer){
            res.status(404).json({error: "not found"})
        }else{
            res.json({customer})
        }
        
    }catch(e){
        res.status(500).json({error: `no user exist on ${id}`})
    }

})

app.put("/api/customers/:id", async (req, res)=> {
    const {id} = req.params
    const result = await Customer.replaceOne({_id: id}, req.body)
    console.log(result)
    res.json({updatedCount: result.modifiedCount})
})

app.delete("/api/customers/:id", async (req, res) => {
    try{
        const {id} = req.params
        const result = await Customer.deleteOne({_id: id})
        res.json({deletedCount: result.deletedCount})
    }catch(e){
        res.status(500).json({error: e.message})
    }
})

const start = async() => {
    try{
        await mongoose.connect(connection)

        app.listen(PORT, () => {
            console.log(`Example appka listening on port ${PORT}`)
        })
    }catch(e){
        console.log(e)
    }
}

start();