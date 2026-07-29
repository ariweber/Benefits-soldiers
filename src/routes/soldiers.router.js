import express from "express"

const router = express.Router()

router.post("/:soldierID/benfits",(req,res)=>{
    res.json()
})


router.get("/::soldierID/benfits",(req,res)=>{
    res.json()
})


router.get("/:id/transactions",(req,res)=>{
    res.json()
})

router.patch("/:id/sepend",(req,res)=>{
    res.json()
})

export default router