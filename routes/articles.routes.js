const {Router} = require('express');


const articlesRouter = Router();

const {ArticleModel} = require('../models/articles.model');

articlesRouter.post("/add", async(req,res)=>{


    try{

        const articles = new ArticleModel(req.body);

        await articles.save();
        res.status(200).send(articles)

    }
    catch(err)
    {
        res.status(400).send({
            "msg":err.message
        })
    }
})

articlesRouter.get("/get", async(req,res)=>{

    const {userID} = req.body;

    let { title, body, user, category, live } = req.query;

    try{

        title = new RegExp(title, 'i');

        if(isCompleted)
        {

            const articles = await ArticleModel.find({userID, title, body, user, category, live}).skip(Limit*(Page-1)).limit(Limit);

            res.status(200).send(articles)


        }

        else
        {
            const articles = await ArticleModel.find({userID, title}).skip(Limit*(Page-1)).limit(Limit);

            res.status(200).send(articles);
        }
    }

    catch(err)
    {
        res.status(400).send({
            "msg":err.message
        })
    }
})

articlesRouter.get('/getone/:articlesID', async(req,res)=>{

    const {articlesID} = req.params

    const userID = req.body.userID

    try
    {
        const verifyArticle = await ArticleModel.findOne({_id:articlesID});

        if(verifyArticle.UserID=== UserID)
        {
            const articles = await ArticleModel.findById({_id:articleID});

            res.status(200).send(articles);
        }
        else
        {
            res.status(400).send({"msg": "You can't able to get tarticles of other user"});
        }
    }
    catch(err)
    {
        res.status(400).send({"err":err.meassage});
    }
})

articlesRouter.patch("/update/:articlesID", async(req,res)=>{

    const {articlesID} = req.params;

    try{
        const verifyarticles = await ArticleModel.findById({_id:articlesID});

        if(verifyarticles.userID=== req.body.userID)
        {
            await ArticleModel.findByIDAndUpdate({_id:articlesID},req.body);

            const articles1= await ArticleModel.findById({_id:articlesID});

            res.status(200).send({
                "msg": `articles ${articles1} has been updated.`
            }
            );
        }
        else
        {
            res.status(400).send({
                "msg":"Unauthorized acess detected. Acess Denied"
            })
        }
    }
    catch(err)
    {
        res.status(400).send({
            "msg":err.message
        })
    }
})

articlesRouter.delete("/delete/:articlesID", async(req,res)=>{
     const {articlesId} = req.params;

     try
     {
        const tarticles = await ArticleModel.findById({_id:todoId});

        if(todo.UserID===req.body.UserID)
        {
            await ArticleModel.findByIDAndDelete({_id:articlesID});

            res.status(200).send({
                "msg":"Article has been deleted."
            });
        }
        else
        {
            res.status(400).send({
                "msg" : "Unauthorized acess detected. Acess Denied"
            })
        }
     }

     catch(err)
     {
        res.status(400).send({
            "msg":err.meassage
        })
     }
})

module.exports = {
  articlesRouter
}
