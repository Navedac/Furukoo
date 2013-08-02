
function sendCnnMsg(){
  $("#LoginFrm").css({opacity:0.5});
  $.ajax({type:'POST',
  data:{u:$('#lgiUsrNameIpt').val() , p:$('#lgiUsrPassIpt').val()},
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
      //console.log(s);
      $('#LoginFrm').modal('hide');
      ELO_Initial = d.substr(4,4);
      LastMsgTime = d.substr(8);
      $('#ContentGrd').fadeIn(1000);
      $('#UserNameTblUI').append(("<tr><td>" + $('#lgiUsrNameIpt').val() + "</td></tr>"));
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
      sendCnnMsg();
      break;
  };
}

function sendCacMsg(){
  switch($('#cacBtn').text()){
    case 'Submit' :
      $("#LoginFrm").css({opacity:0.5});
      $.ajax({type:'POST',
        data:{u:$('#lgiUsrNameIpt').val(),p:$('#lgiUsrPassIpt').val(), m:$('#lgiUsrMailIpt').val()},
        dataType: 'text', timeout: 6000, cache: false,
        url: BASEPATH + "adduser.php",
        success: function(d){sendCnnMsgCptd(d);},
        error  : function(){sendCacMsg();}
      });
      break;
    default :
      $('#cnnBtn').hide();
      $('#lgiUsrMailLbl').show();
      $('#lgiUsrMailIpt').show();
      $('#cacBtn').text('Submit');
      break;
  }
}


