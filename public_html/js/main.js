var BASEPATH = "http://www.furukoo.fr/furukoov3/";

var LastMsgTime = 12345678901234; // 14 digits
var Adress = "00000000000000";
var Smoke = false;
var rLoopTmrId = null;
var LoginFrm = 1500;
// var rwc = null;

$(function(){main();});

function main(){
  // readingLoop();
  $('#LoginFrm').modal('show');
}

function readingLoop(){
  $.ajax({type:'POST', data:{u:'Yvan', t:LastMsgTime, r:'1500', a:Adress},
  dataType: 'text', timeout: 6000, cache: false,
  url: BASEPATH + "r.php",
  success: function(data){
    switch(data){
      case "" : rLoopTmrId = setTimeout(readingLoop, 400); break;
      default : 
        console.log(data);
        var j = $.parseJSON(data);
        if(j===null){
          console.log(j);
          rLoopTmrId = setTimeout(readingLoop, 400);
          break;
        }
        msgRcv($.parseJSON(data)); break;
    };
  },
  error  : function(){rLoopTmrId = setTimeout(readingLoop, 400);}
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
  $('#ChatMsgListGrdUI').scrollTop(5000);
  rLoopTmrId = setTimeout(readingLoop, 400);
}

function displayTextinChatBox(Msg,ChatColor){
  $('#ChatMsgListTblUI').append(("<tr><td>" + Msg + "</td></tr>"));

}

function msgXmt(){
  $.ajax({type:'POST',
  data:{d:'{"D":"' + $('#msgTbx').val() + '","U":"Yvan","c":2', t:LastMsgTime, s:0, a:Adress},
  dataType: 'text', timeout: 6000, cache: false,
  url: BASEPATH + "w.php",
  success: function(){$('#msgTbx').val('');},
  error  : function(){msgXmt();}
  });
}

function sendCnnMsg(){
  // $("#LoginFrm").css({opacity:0.5});
  $.ajax({type:'POST',
  data:{u:$('#lgiUsrNameLbl').val() , p:$('#lgiUsrPassLbl').val()},
  dataType: 'text', timeout: 6000, cache: false,
  url: BASEPATH + "c.php",
  success: function(d){sendCnnMsgCptd(d);},
  error  : function(){sendCnnMsg();}
  });
}
function sendCnnMsgCptd(d){
  var s = d.substr(0,3);
  switch(s){
    case 'CON' :
      console.log(s);
      $('#LoginFrm').modal('hide');
      ELO_Initial = d.substr(4,4);
      LastMsgTime = d.substr(8);
      readingLoop();
      break;
    case 'DCN' :
      $("#LoginFrm").css({opacity:1});
      console.log(s);
      break;
    case 'USR' :
      console.log(s);
      break;
    case 'NUR' :
      console.log(s);
      break;
  };
}


$('#sendBtn').on("click", function(){msgXmt();});
$('#msgTbx').on("keyup", function(e){if(e.keyCode === 13){msgXmt();}});
$('#cnnBtn').on("click", function(){sendCnnMsg();});



