const express = require("express")
const mongoose = require("mongoose")

const connect = ()=>{
    return mongoose.connect("mongodb://localhost:27017/test")
}

const app = express()

app.use(express.json());


const companySchema = new mongoose.Schema({

    name:{type:String, required :true},
    city:{type:String,required:true},
    phn_no:{type:Number,required:true},
    
    job_ids:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"job",
            required:true
        }
    ]
},{
    versionKey:false,
    timestamps:true
})


const Company = mongoose.model("company",companySchema)

const jobSchema = new mongoose.Schema({
    title:{type:String,required:true},
 rating:{type:Number,required:true}

},{
    versionKey:false,
    timestamps:true
})

const Job = new mongoose.model("job",jobSchema)

const citySchema = new mongoose.Schema({
    name:{type:String,required:true},
    numberofjobs:{type:Number},
    job_ids:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true  
    }]
},{
    versionKey:false,
    timestamps:true
})

const City = new mongoose.model("city",citySchema)




const skillSchema = new mongoose.Schema({
    name:{type:String,required:true},
    job_ids:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true  
    }]
},{
    versionKey:false,
    timestamps:true
})



const Skill = new mongoose.model("skill",skillSchema)


const workFromHomeSchema = new mongoose.Schema({
    
    job_ids:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true  
    }]
},{
    versionKey:false,
    timestamps:true
})



const WorkFromHOme = new mongoose.model("workFromHOme",workFromHomeSchema)


app.post("/jobs",async (req,res)=>{

    try{
        const job = await Job.create(req.body)
        return res.status(201).send(job)
    }
   catch(e){
       return res.status(500),json({message:e.message,status:"failed"})
   }
})

app.get("/jobs",async(req,res)=>{
    try{
        const jobs = await Job.find().lean().exec()
        return res.send({jobs})
    }
   catch(e){
       return res.status(500),json({message:e.message,status:"failed"})
   } 
})


app.post("/company",async (req,res)=>{

    try{
        const company = await Company.create(req.body)
        return res.status(201).send(company)
    }
   catch(e){
       return res.status(500),json({message:e.message,status:"failed"})
   }
})

app.get("/company",async(req,res)=>{
    try{
        const companies = await Company.find().lean().exec()
        return res.send({companies})
    }
   catch(e){
       return res.status(500),json({message:e.message,status:"failed"})
   } 
})


app.listen(2340,async ()=>{
    await connect()
    console.log("listening on port 2340")
})