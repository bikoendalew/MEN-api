const express=require('express');
const routes=express.Router();
const Student = require('../models/studentModel')

//get student

routes.get('/', async (req,res)=>{
 try{
   const Students= await Student.find()
   res.json(Students);
 }catch(err){
   res.status(500).json({message:err.message})
 }
});

routes.get('/:id', getStudents,(req,res)=>{
 res.send(res.student.name)
});

//add students
routes.post('/', async (req,res)=>{
  const students=new Student({
    name:req.body.name,
    age:req.body.age
  });
    try{
        const newStudent=await students.save();
        res.status(200).json(newStudent);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

//update
routes.patch('/:id',getStudents,async(req,res)=>{

    if(req.body.name!==null){
        res.student.name=req.body.name
    }

    if(req.body.age!==null){
        res.student.age=req.body.age
    }
 try{
   const updated=await res.student.save();
   res.json(updated);
 }catch(err){
    res.status(400)
 }
});
//delete
routes.delete('/:id', getStudents, async (req,res)=>{
  try{
     await res.student.remove();
     res.json({message:"Deleted"});
  }catch(err){
    res.status(500);
  }
});

// middleware to check student exist
async function getStudents(req,res,next){
    let student
    try{
      student=await Student.findById(req.params.id)
      if(student==null){
        return res.status(400).json({message:'Can not find students'});
      }
    }catch(err){
      res.status(500).json({message:err.message})
    }
    res.student=student
    next();
}

module.exports=routes
