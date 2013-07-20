var BASEPATH = "http://www.furukoo.fr/furukoov3/";


$(function(){
  
var LastMsgTime = 12345678901234; // 14 digits
var Adress = "00000000000000";
var Smoke = false;
var rLoopTmrId = null;
var rwc = null;

init();

function init(){
  readingLoop();
}

function readingLoop(){
  rwc = $.ajax({type:'POST', data:{u:'Yvan', t:LastMsgTime, r:'1500', a:Adress},
  dataType: 'json', timeout: 6000,
  url: BASEPATH + "r.php",
  success: function(json){msgRcv(json);},
  error  : function(){rLoopTmrId=setTimeout(readingLoop,400);}
  });
}

function msgXmt(){
  rwc.abort();
  $.ajax({type:'POST',
  data:{d:'{"D":"' + $('#msgTbx').val() + '","U":"Yvan","c":2', t:LastMsgTime, s:0, a:Adress},
  dataType: 'json', timeout: 6000,
  url: BASEPATH + "w.php",
  success: function(){},
  error  : function(){}
  });
}


function msgRcv(json){
  $.each(json, function(){
    if(LastMsgTime <= this['t']){
       LastMsgTime = this['t'];
    }
    switch(this['s']){
      case 0 :
        displayTextinChatBox(this['D'],0);
    };
  });
  $('#ChatMsgListGrdUI').scrollTop(400);
  rLoopTmrId = setTimeout(readingLoop, 400);
}

function displayTextinChatBox(Msg,ChatColor){
  if(Smoke){
    $('#ChatMsgListGrdUI').append(("<div>" + Msg + "</div>"));
    Smoke=false;
  }
  else{
    $('#ChatMsgListGrdUI').append(("<div class=smoke>" + Msg + "</div>"));
    Smoke=true;
  }
}

$('#sendBtn').on("click", function(){
  msgXmt();
  $('#msgTbx').val('');
});

$('#msgTbx').on("keyup", function(e){
  if(e.keyCode === 13) {
    msgXmt();
    $('#msgTbx').val('');
  }
});

});






