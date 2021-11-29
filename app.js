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
    jobs:{type:Number,required:true},
    
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
 rating:{type:Number,required:true},
 noticeperiod:{type:Number,required:true},
 skill_id:{
     type:mongoose.Schema.Types.ObjectId,
            ref:"job",
            required:true 
 }
},{
    versionKey:false,
    timestamps:true
})

const Job = new mongoose.model("job",jobSchema)

const citySchema = new mongoose.Schema({
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

// find all jobs by sorting the jobs as per their rating.
app.get("/jobs/rating",async(req,res)=>{
    try{
        const jobs = await Job.find({}).sort({rating:1}).lean().exec()
        return res.send({jobs})
    }
   catch(e){
       return res.status(500),json({message:e.message,status:"failed"})
   } 
})

// find all the jobs that will accept a notice period of 2 months.
app.get("/jobs/noticeperiod",async(req,res)=>{
    try{
        const jobs = await Job.find({noticeperiod: {$eq:2}}).lean().exec()
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

app.get("/company/:id",async(req,res)=>{
    try{
        const Company = await Company.findById(req.params.id).lean().exec()
        return res.send({company})
    }
   catch(e){
       return res.status(500),json({message:e.message,status:"failed"})
   } 
})

// an api to get details of the company.
app.patch("/company/:id",async(req,res)=>{
    try{
        const company = await Company.findById(req.params.id).lean().exec()
        return res.send({company})
    }
   catch(e){
       return res.status(500),json({message:e.message,status:"failed"})
   } 
})

app.post("/skill",async (req,res)=>{

    try{
        const skill = await Skill.create(req.body)
        return res.status(201).send(skill)
    }
   catch(e){
       return res.status(500),json({message:e.message,status:"failed"})
   }
})
app.post("/city",async (req,res)=>{

    try{
        const city = await City.create(req.body)
        return res.status(201).send(city)
    }
   catch(e){
       return res.status(500),json({message:e.message,status:"failed"})
   }
})

app.get("/city/:id",async(req,res)=>{
    try{
        const city = await City.findById(req.params.id).populate("job_ids").lean().exec()
        return res.send({city})
    }
   catch(e){
       return res.status(500),json({message:e.message,status:"failed"})
   } 
})

app.post("/wfh",async (req,res)=>{

    try{
        const wfh = await WorkFromHOme.create(req.body)
        return res.status(201).send(wfh)
    }
   catch(e){
       return res.status(500),json({message:e.message,status:"failed"})
   }
})

// find all the jobs that are available as Work from home.
app.get("/wfh",async(req,res)=>{
    try{
        const wfh = await WorkFromHOme.find().populate("job_ids").lean().exec()
        return res.send({wfh})
    }
   catch(e){
       return res.status(500),json({message:e.message,status:"failed"})
   } 
})

app.listen(2340,async ()=>{
    await connect()
    console.log("listening on port 2340")
})