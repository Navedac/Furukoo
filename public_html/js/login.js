
function sendCnnMsg(){
  $("#LoginFrm").css({opacity:0.5});
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
      //console.log(s);
      $('#LoginFrm').modal('hide');
      ELO_Initial = d.substr(4,4);
      LastMsgTime = d.substr(8);
      $('#ContentGrd').fadeIn(1000);
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

function sendCacMsg(){
  switch(createAcc){
    case true :
      break;
    case false :
      createAcc = true;
      $('#cnnBtn').hide();
      $('#lgiUsrMailLbl').show();
      $('#lgiUsrMailIpt').show();
      $('#cacBtn').text('Sign Up');
      break;
  }
}
