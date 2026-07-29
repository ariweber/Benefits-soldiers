import express from "express"

const router = express.Router()

router.post("/",(req,res)=>{
    res.json()
})


router.get("/",(req,res)=>{
    res.json()
})


router.get("/:id/transactions",(req,res)=>{
    res.json()
})

router.get("/:id/sepend",(req,res)=>{
    res.json()
})

export default router