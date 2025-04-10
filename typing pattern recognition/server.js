var express = require('express');
var bodyparser = require("body-parser");
var app = express();
var fs = require('fs');
var spawn = require("child_process").spawn;
var http = require('http');
var server = http.createServer(app);
var return_name,num_str='';
var path = require('path');
var mongoose=require("mongoose");
var ejs=require("ejs");



var nodemailer = require('nodemailer');

app.get("/forget/:id",function(req,res){
      var x=req.params.id;
      console.log(x);
      console.log("forget password code..")
   var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shauryakhurana809@gmail.com',
    pass: '<your_pass>'
  }
 });

var mailOptions = {
  from: 'shauryakhurana809@gmail.com',
  to: x,
  subject: 'Sending Email using Node.js',
  text: 'http://localhost:3000/success/'+x
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.redirect("/");
  }
});
});


app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/signup");

var userschema=new mongoose.Schema({
	 username: String,
	 pass: String
});

var User=mongoose.model("User",userschema);


app.get("/train/:id",function(req,res){
	res.send("train successfully done by user "+req.params.id);
});


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/page.html");
  //res.render("home");
});

app.get("/success",function(req,res){
	console.log("success mein aaya");
	//console.log(req.params.id);
 res.render("success.ejs");
 //res.render("acad");	
 // res.sendFile( __dirname + "/success.html");
  console.log("wapas aa gaya");
});


app.get("/success/:id",function(req,res){
	console.log("aaya yaha");
	//console.log(req.params.id);
 res.render("success",{username:req.params.id});
 //res.render("acad");	
 // res.sendFile( __dirname + "/success.html");
  console.log("wapas aa gaya");
});


app.post('/message',function(req,res){
  msg = req.body.val;
  type=req.body.type;
  pass=req.body.pass;
  var user1=req.body.username;
  console.log(req.body.username);
  console.log(req.body.pass);
  if(type=="signup")
  {
	   //msg = msg + ',' + req.body.username;
	   console.log("hello signup");
	   User.find({username:user1},'pass',function(err,founduser){
	   console.log(founduser,err);
		 if(founduser.length==0)
		 {
			  console.log("user not found in db");
			  //res.send('error');
		 	  //res.end();
		 
	   var user=new User({username:user1,pass:pass});
	   User.create(user,function(err,usercreated){
		  if(err)
		  {
			  console.log("user creation failed");
			 // return res.redirect("/");
		  }			  
		  else
		  {
			  console.log("redirect");
			  //return res.redirect("/hello");
			  console.log("hello traiin");
			  msg = msg + ',' + req.body.username;
			  fs.appendFile(__dirname+'/data.csv', msg+'\r\n', function(err) {
			  if(err) {
				  return console.log(err);
			  }
			  else
			  {
				  console.log("The file was saved to data.csv");
				  res.send(req.body.username);
				  res.end();
			  }
		
			});
			  
		  }
	   });
	  }
	  
	  else{
	  console.log("user already found");
	  res.send('error');
	  res.end();
	  }
	});
	   
  
  }
  else if(type=="train")
  {
	  console.log("hello train");
	  
	  User.find({username:user1},'pass',function(err,founduser){
		 if(err)
		 {
			  console.log("error in db");
			  res.send('error');
		 	  res.end();
		 }
		 else if(founduser.length==0)
		 {
		 	console.log("user not found in db");
		 	res.send('error');
		 	  res.end();
		 }	
         else if(founduser.length!=0)
		{
			//console.log("in db username "+founduser[0].username);
			console.log("in db "+founduser[0].pass);
			console.log("user current pass "+pass)
			 if(founduser[0].pass==pass)
			 {
			 	 msg = msg + ',' + req.body.username;
				 console.log("pasword is right welcome");
	  			 fs.appendFile(__dirname+'/data.csv', msg+'\r\n', function(err) {
      if(err) {
          return console.log(err);
      }
      else
      {
         console.log("The file was saved to data.csv");
    	 res.send(req.body.username);
		 res.end();
      }
    });
	
  }
  else
  {
         res.send('error');
		 res.end();
  }
  
  }
  });
  }
  else if(type=="test")
  {
	  console.log("hello test");
	  User.find({username:user1},'pass',function(err,founduser){
		 if(founduser.length==0)
		 {
			 console.log("user not found in db");
			 res.send("error");
		 }	
         else
		{
			//console.log("in db username "+founduser[0].username);
			console.log("in db "+founduser[0].pass);
			console.log("user current pass "+pass)
			 if(founduser[0].pass==pass)
			 {
				 console.log("pasword is right welcome");
				 //res.render("success",{username:user1});
				    var num_str="0,1,2,3,4,5,6";
	                
					fs.writeFile(__dirname+'/test.csv', num_str + '\r\n' + msg + '\r\n', function(err) {
					if(err) {
								console.log(err);
							}
			});
			num_str = "";
			console.log("The file was saved to test.csv");
			var process = spawn('python3',[__dirname+"/predict4.py", '1']);
			process.stdout.on('data', function (data){
			return_name = data.slice(2,-3).toString();
			console.log(return_name);
			if(return_name==user1)
			{
				console.log("prediction done")
				//res.render("success.ejs",{username:user1});
				res.send('r'+req.body.username);
				  //res.end();
				
			}
			else
			{
				//verification code to run
				console.log("prediction not good")
				res.send('w'+req.body.username);
				  //res.end();
				//res.render("error.ejs");
			}
			
		 			 
	        });
			 }
			 else{
				 //flash message redirct 
				 console.log("wrong password enter right");
				 res.send('error');
				 
			 }
		 }
   });
  }
	  
});
app.listen(3000,function(err){
  if(err){
    console.log("port error");
  }
  else{
    console.log("connected sucessfully");
  }
});
