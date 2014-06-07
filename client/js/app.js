var _postHttpRequest = function(params) {
  var http = new XMLHttpRequest(),
      url = 'http://localhost:3000/sendSMS';

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
  /* text area  */
  var textarea = document.getElementById('items-list-textarea');
  /* order button */
  var orderButton = document.getElementById('order-btn');

  orderButton.addEventListener('click', function() {
    _postHttpRequest({'message': textarea.value});
  });

});
