var BASEPATH = "http://www.furukoo.fr/furukoov3/";


$(function(){
  
var LastMsgTime = 12345678901234; // 14 digits
var Adress = "00000000000000";
var Smoke = false ;


$.ajax({
  type: 'POST',
  data: {u:'Yvan', t:'03738273098109', r:'1500', a:'00000000000000'}, 
  dataType: 'json',
  url: BASEPATH + "r.php",
  success: function(json){readmsg(json);}
});

function readmsg(json){
  //var htm = '';
  $.each(json, function(){
    DisplayTextinChatBox(this['D'],0);
    // htm += "<div>" + this['U'] + "</div>";
  });
  //$('#ChatMsgListGrdUI').append(("<div>" + $('#ChatMsgListGrdUI').children().size() + "</div>"));
  
}

function MsgRcv(msg){
  
}

function DisplayTextinChatBox(Msg,ChatColor){
  if(Smoke){
    $('#ChatMsgListGrdUI').append(("<div>" + Msg + "</div>"));
    Smoke=false;
  }
  else{
    $('#ChatMsgListGrdUI').append(("<div class=smoke>" + Msg + "</div>"));
    Smoke=true;
  }

  
}

});

