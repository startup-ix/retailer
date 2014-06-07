var _postHttpRequest = function(params) {
  var http = new XMLHttpRequest(),
      url = 'http://localhost:4000/sendSMS';

  http.open('POST', url);

  /* send the proper header information along with their request */
  http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
      alert(http.responseText);
    }
  }

  http.send(JSON.stringify(params));
};

/* execute scripts only when dom contents are loaded */
document.addEventListener('DOMContentLoaded',function() {

  /* order button */
  var orderButton = document.getElementById('order-btn');
  orderButton.addEventListener('click', function() {
    console.log('wtf');
    _postHttpRequest({'message': 'hello World'});
  });

});
