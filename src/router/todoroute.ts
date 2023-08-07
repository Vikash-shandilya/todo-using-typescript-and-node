import express from 'express'
const router=express.Router()
import Todo from '../models/todo'


type requestBody={text:string}
type requestParams={todoId:string}

const data:Todo[]=[]

router.get('/',(req,res,next)=>{
    return res.status(200).json({todos:data})

})
router.post('/todo',(req,res,next)=>{
    const body=req.body as requestBody
    const newTodo:Todo={
        id:new Date().toISOString(),
        task:body.text
    }
    data.push(newTodo)
    return res.status(201).json({message:'Added Todo',todo:newTodo,todos:data})
})

router.put('/todo/:todoId',(req,res,next)=>{
    const params=req.params as requestParams
    const body=req.body as requestBody
    const tid=params.todoId;
    const todoIndex=data.findIndex(item=>item.id===tid)
    if(todoIndex>=0)
    {
        data[todoIndex]={id:data[todoIndex].id,task:body.text}
        return res.status(200).json({message:'Updated Todo',todos:data})
    }
    return res.status(404).json({message:'Could not find todo for this id'})
})

router.delete('/todo/:todoId',(req,res,next)=>{
    const params=req.params as requestParams
    const tid=params.todoId;
    const todoIndex=data.findIndex(item=>item.id===tid)
    if(todoIndex>=0)
    {
        data.splice(todoIndex,1)
        return res.status(200).json({message:'Deleted Todo',todos:data})
    }
    return res.status(404).json({message:'Could not find todo for this id'})
})

export default router;