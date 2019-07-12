var q =0,str = '',i = 0,count = 0;
//var ref = 'the quick brown fox jumped over the lazy dog';
//ref = ref.toUpperCase();
var val=[];
//var nos=[];
$(document).ready(function(){
$('#press').keydown(function(event){
	console.log("finish");
  if(event.keyCode != 8 && event.keyCode != 16){
    //$('#msg').text("");
    val[0]=(new Date()).getTime();
    //$('#time').text(val[0]);
      if(q == 0){
        val[1] = (new Date()).getTime();
        q = q+1;

      }
      else{
        diff = val[0] - val[1];
        val[1] = val[0];
        if(q == 1){
          str = String(diff);
          q = q+1;
        }
        else{
        	if(i<8)
          str = str+','+String(diff);
        }
        //$('#s').text(str);
        //nos[i] = Number(diff);
    }
   i = i+1 ;
  }
 /* else if((event.keyCode == 8 /*|| event.keyCode == 8 || event.which == 8*//*) && count >=0){
    count = count-1;
    $('#msg').text("");

  }
  else{
    $('#msg').text("please enter correct value");
    count = count+1 ;
  }*/
});
$("#train").click(function(){
  if(str.split(",").length ==7){
    $.ajax({
      type: "post",
      url: "/message",
      dataType:"text",
      data:{
		type : "train",
        val : str,
		pass : $('#press').val(),
        username : $('#username').val()
      },
     success:function(valu){
        if(valu =="error"){
          //$("#time").text("sucessfully saved to database");
          alert("train not successfull...");
          window.location.assign("/");
        }
        else{
          alert("training successfully..");
          window.location.assign("/");
          //window.location.assign("/train/"+valu);
        }
      }
    });
  }
});

//for the test purpose
$("#test").click(function(){
  if(str.split(",").length ==7){
    $.ajax({
      type: "post",
      url: "/message",
      dataType:"text",
      data:{
		type : "test",
        val : str,
		pass : $('#press').val(),
        username : $('#username').val()
      },
     success:function(valu){
        if(valu == "error"){
           alert("error while testing....wrong username or password ");
           window.location.assign("/");
          }
        else {
           var x=valu;
           if(x[0]=='r')
         {
          x=x.slice(1,x.length);
          alert("test done successfully..");
          window.location.assign("/success/"+x);
         }
          else
          {
                x=x.slice(1,x.length);
                console.log("username"+x)
          alert("test not done successfully..verify using mail");
          window.location.assign("/forget/"+x); 
          }
        }
      }
    });
  }
});


//signup
$("#signup").click(function(){
console.log(str.split(",").length);
  if(str.split(",").length ==7){
    $.ajax({
      type: "post",
      url: "/message",
      dataType:"text",
      data:{
		type : "signup",
        val : str,
		pass : $('#press').val(),
        username : $('#username').val()
      },
     success:function(valu){
        if(valu !="error"){
			console.log("finished");
			alert("signed up successfully..");
		    window.location.assign("/");
		    console.log("finished2");
        }
        else{
        	alert("user already exists..");
        	window.location.assign("/");
        }
      } 
    });
  }
 /* str = "";
  q = 0;
  $('#press').val("");
  count = 0;
  i = 0;
  val = [];
  nos = [];
  document.getElementById("press").focus();
  document.getElementById("press").select();*/
});
});
window.onload = function(){
  var text_input = document.getElementById('username');
  text_input.focus ();
  text_input.select ();
}
