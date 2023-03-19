//jshint esversion: 6

const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app=express();

app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+ "/signup.html");
});


//now creating the post rout
app.post("/", function(req,res){
    const firstName= req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;

   // console.log(firstName,lastName,email);
   var data={
    //as a new javascript object
    members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields:{
            FNAME: firstName,
            LNAME: lastName

          }
          //basically these are the objects and we are defining their 
          //respective values
          //this reference has been taken form the
          //list ids on the mailchimp

        }
    ]
   };



   //now what we want is to make this js inot json
//just like the one that was depicted in mailchimp
//by angelu yu

const jsonData= JSON.stringify(data); 

const url= "https://us18.api.mailchimp.com/3.0/lists/9c96fcf326";

const options={
    method: "POST",
    //this auth is for the purpose of authentication
    auth: "nischay:54d1352b6380eb32f5fab9a79a8f265c-us18"
}



const request=https.request(url,options, function(response){

       if(response.statusCode===200) {
        res.sendFile(__dirname+"/success.html");
       }
       else{
        res.sendFile(__dirname+"/failure.html");
       }

        response.on("data", function(data){
            console.log(JSON.parse(data));
            //to parse the JSON data
            //meaning convert json string to 
            //js object
        })
})




request.write(jsonData);
request.end();

});


app.post("/failure", function(req,res){
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on Port 3000");
});


//API KEY
//54d1352b6380eb32f5fab9a79a8f265c-us18

//list id
//9c96fcf326