const wrapAsync=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    }
}
// (err)=>next(err)

module.exports=wrapAsync;