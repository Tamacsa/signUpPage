const express = require("express");
const app = express();
const bodyParser= require("body-parser");
const https= require("https");


app.use(express.static(__dirname + "/public"))
var favicon = require('serve-favicon');
var path = require('path')

app.use(bodyParser.urlencoded({extended:true}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get("/", function(request, response){
    response.sendFile(__dirname + "/signup.html");

    });

app.post("/", function(request, response){
    const name = request.body.fname;
    const email = request.body.email;
    const problem = request.body.problem;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    NAME: name,
                    PROBLEM: problem,
                }
            }
        ]
    }
    const jsonData= JSON.stringify(data)
    const url = "https://us21.api.mailchimp.com/3.0/lists/e120c62901";
    const options = {
        method: "POST",
        auth: "tamacsa1998:abf49d8b43f03827bc487cd583cc2129-us21"
    }

   const req=  https.request(url, options, function(res){
        if (res.statusCode === 200){
            response.sendFile(__dirname + "/succes.html")
        } else {
            response.sendFile(__dirname + "/failure.html")
        };

        res.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    //req.write(jsonData);
    req.end();  
});

app.post("/failure", function(request, response){
    response.redirect("/")
});


app.listen(process.env.PORT || 3000, function(){
    console.log("app is running on channel")
})
//api key
//abf49d8b43f03827bc487cd583cc2129-us21
//unique 
//e120c62901
