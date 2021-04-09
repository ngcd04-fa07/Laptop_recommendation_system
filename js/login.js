var form = {
   "loginForm" : document.getElementById('login'),
   "response" : document.getElementById('response'),
   "id" : document.getElementById('id'),
   "pass" : document.getElementById('pass'),

}

form.loginForm.addEventListener('submit', (e)=> {
   e.preventDefault();

   var formdata = new FormData();
   formdata.append('id',form.id.value);
   formdata.append('pass',form.pass.value);

   fetch('../php/login.php', {
      method: 'POST',
      body: formdata
   })

   .then((resp) => resp.json())

   .then((data) => {
      if(!data.flag){
      form.response.innerHTML = data.mess;
      }
      else {
         window.location.href = "../html/user_homepage.html";
      }
   })
   .catch((err) => console.log(err))
});


