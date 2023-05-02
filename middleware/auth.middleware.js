require('dotenv').config();

const jwt = require('jsonwebtoken');

const Auth = (req,res,next)=>{

    if(!req.headers['authorization'])
    {
        return res.status(400).send({
            "msg":"Invalid Access."
        })
    }


    const token= req.headers['authorization'].split('')[1];

    if(token)
    {

        
        try
        {
            const decode = jwt.verify(token,process.env.SecretKey);

            if(decode)
            {
                req.body.UserID = decode.UserId;

                next()

            }
            else
            {

                res.status(400).send({
                    "msg":"Kindly login first"
                })
            }
  
        }
        catch(err)

        {
            res.status(400).send({
                "msg":"Kindly login first"
            })

        }
    }

    else
    {
        res.status(400).send({
            "msg":"Kindly login first"
        })
    }
}


module.exports={
    Auth
}