var BASEPATH = "http://www.furukoo.fr/furukoov3/";


$(function(){
  
var LastMsgTime = 12345678901234; // 14 digits
var Adress = "00000000000000";
var Smoke = false;
var rLoopTmrId = null;
var rwc = null;

init();

function init(){
  ReadingLoop();
}

function ReadingLoop(){
  rwc = $.ajax({type:'POST', data:{u:'Yvan', t:LastMsgTime, r:'1500', a:Adress},
  dataType: 'json', timeout: 8000,
  url: BASEPATH + "r.php",
  success: function(json){MsgRcv(json);},
  error  : function(){rLoopTmrId=setTimeout(ReadingLoop,400);}
  });
}

function MsgXmt(){
  rwc.abort();
  // var msg = $('#msgTbx').val();
  $.ajax({type:'POST', data:{d:'{"D":"' + $('#msgTbx').val() + '","U":"Yvan","c":2', t:LastMsgTime, s:0, a:Adress },
  dataType: 'json', timeout: 2000,
  url: BASEPATH + "w.php",
  success: function(){},
  error  : function(){}
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
  rLoopTmrId = setTimeout(ReadingLoop, 400);
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

$('#sendBtn').click(function(){
  MsgXmt();
  $('#msgTbx').val('');
});

});






