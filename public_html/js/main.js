var BASEPATH = "http://www.furukoo.fr/furukoov3/";


$(function(){
  
var LastMsgTime = 12345678901234; // 14 digits
var Adress = "00000000000000";
var Smoke = false;
var ReadingLoopTmrId = null;

init();


function init(){
  
  ReadingLoop();
  
}

function ReadingLoop(){
  $.ajax({
  type: 'POST',
  data: {u:'Yvan', t:LastMsgTime, r:'1500', a:Adress}, 
  dataType: 'json',
  url: BASEPATH + "r.php",
  success: function(json){MsgRcv(json);},
  error  : function(){ReadingLoopTmrId = setTimeout(ReadingLoop, 400);}
  });
}


function MsgRcv(json){
  $.each(json, function(){
    if(LastMsgTime <= this['t']){
       LastMsgTime = this['t'];
    }
    switch(this['s']){
      case 0 :
        DisplayTextinChatBox(this['D'],0);
    };
  });
  $('#ChatMsgListGrdUI').scrollTop(400);
  ReadingLoopTmrId = setTimeout(ReadingLoop, 400);
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






