import express from "express";
import bodyParser from "body-parser";
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
const port=process.env.PORT || 4000;
const blog=[];
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index.ejs");
})
app.get("/create",(req,res)=>{
    res.render("create.ejs");
});
app.post("/blogs",(req,res)=>{
    const data={
         author:req.body["author"],
        title:req.body["title"],
        content:req.body["content"],
        date:new Date().toLocaleString("en-IN",{
            weekday:"short",
            day:"2-digit",
            month:"short",
            year:"numeric",
            hour:"2-digit",
            minute:"2-digit"
        })
    };
    blog.push(data);
    res.redirect("/allblogs");
});
app.get("/allblogs",(req,res)=>{
    res.render("save.ejs",{blog});
});
app.get("/view",(req,res)=>{
    const id=req.query.blogindex
    res.render("view.ejs",{blog:blog[id]});
});
app.get("/delete",(req,res)=>{
    const id=req.query.blogedit
    blog.splice(id,1);
    res.redirect("/allblogs");
})
app.listen(port,()=>{
    console.log(`Server Running on ${port}`);
});