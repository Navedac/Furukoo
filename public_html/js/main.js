$(function(){
  
var uri = 'http://www.furukoo.fr/furukoov3/';


$.ajax({
  type:'POST',
  data:{u:'Yvan', t:'03738273098109', r:'1500', a:'00000000000000'}, 
  dataType:'json',
  url:uri+'r.php',
  success:function(json){readmsg(json);}
});

function readmsg(json){
  alert("Données retournées : " + json );
}

});

