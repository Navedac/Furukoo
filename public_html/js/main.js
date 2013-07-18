var BASEPATH = 'http://www.furukoo.fr/furukoov3/';


$(function(){
  
var LastMsgTime = 12345678901234; // 14 digits
var Adress = "00000000000000";


$.ajax({
  type: 'POST',
  data: {u:'Yvan', t:'03738273098109', r:'1500', a:'00000000000000'}, 
  dataType: 'json',
  url: BASEPATH + 'r.php',
  success: function(json){readmsg(json);}
});

function readmsg(json){
  var htm = '';
  $.each(json, function(){
    htm += "<div>" + this['U'] + "</div>";
  });
  $('#ChatMsgListGrdUI').html(htm);
}

});

