const Task=require("../models/task");

exports.createTask=async(req,res)=>{

    const task=await Task.create({

        ...req.body,

        createdBy:req.user.id

    });

    res.status(201).json(task);

};

exports.getAllTasks=async(req,res)=>{

    const tasks=await Task.find()
        .populate("assignedTo","name email");

    res.json(tasks);

};

exports.myTasks=async(req,res)=>{

    const tasks=await Task.find({

        assignedTo:req.user.id

    });

    res.json(tasks);

};

exports.updateStatus=async(req,res)=>{

    const task=await Task.findById(req.params.id);

    if(!task)
        return res.status(404).json({message:"Task Not Found"});

    if(task.assignedTo.toString()!=req.user.id)
        return res.status(403).json({message:"Not Allowed"});

    task.status=req.body.status;

    await task.save();

    res.json(task);

};

exports.updateTask=async(req,res)=>{

    const task=await Task.findByIdAndUpdate(

        req.params.id,
        req.body,
        {new:true}

    );

    res.json(task);

};

exports.deleteTask=async(req,res)=>{

    await Task.findByIdAndDelete(req.params.id);

    res.json({message:"Deleted"});

};