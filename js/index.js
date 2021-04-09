var form = {
   "loginForm" : document.getElementById('log-form'),
   "response" : document.getElementById('response'),
   "id" : document.getElementById('id'),
   "pass" : document.getElementById('pass'),
}

form.loginForm.addEventListener('submit', (e)=> {
   e.preventDefault();
   var formdata = new FormData();
   formdata.append('id',form.id.value);
   formdata.append('pass',form.pass.value);
   fetch('php/index.php', {
      method: 'POST',
      body: formdata
   }).then((resp) => resp.json())
   .then((data) => {
      if(!data.flag){
      form.response.innerHTML = data.mess;
      }
      else {
         //  window.location.href = "home.html";
         form.response.innerHTML = data.mess;
      }
   })
   .catch((err) => console.log(err))
});


