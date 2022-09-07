const express = require("express");
const app = express();
const https = require('https');
const request = require("request");

app.use(express.urlencoded({extended : true}));

app.get("/", (req,res)=>{
    console.log("running");
    res.sendFile(__dirname + "/home.html");
});

app.post("/list", (req,res) =>{
    const name = req.body.nam;
    const mail  = req.body.mail;
    const lname = req.body.lnam;
    const url = "https://us12.api.mailchimp.com/3.0/lists/d4b8df72c4";
    const data = {
        members: [
            {
                email_address : mail,
                status : "subscribed",
                update_existing : true,
                merge_fields: {
                    FNAME : name,
                    LNAME : lname,
                }
            }
        ] 
    }
    const dataj = JSON.stringify(data);
    const options = {
        method : "POST",
        auth : "harsh:84d2a856e6447c662d48604509607c78-us12"
    }
    const requ = https.request(url,options, (data) => {
             data.on("data",(datat) => {
             console.log(JSON.parse(datat));
        });

    }); 
    requ.write(dataj);
    requ.end();
    res.sendFile(__dirname + "/side.html");
});

app.listen(2500);

//endpath - https://us12.mailchimp.com/account/api/
//api key - 84d2a856e6447c662d48604509607c78-us12
// list id - d4b8df72c4

