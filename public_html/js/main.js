$(function(){


$.ajax({
  type: "POST",
  data: {u:'Yvan', t:'03738273098109', r:'1500', a:'00000000000000'}, 
  dataType:"json",
  url: "http://www.furukoo.fr/furukoov3/r.php",
    
  success:
  function(data){
    alert("Données retournées : " + data );
  }
});



// to do list
// -> 

});

