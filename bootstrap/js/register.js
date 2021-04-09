var form = {
   "response" : document.getElementById("response"),
   "subform" : document.getElementById("reg-form")
}

form.subform.addEventListener('submit', (e)=> {
   e.preventDefault();
   form.response.innerHTML = "";
   var xhr = new XMLHttpRequest();
   var formData = $("form").serialize();
   xhr.open('POST', '../php/register.php', true);
   var color = "";
   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   xhr.onload = function () {
      if(this.status == 200) {
         var res = JSON.parse(this.responseText);
         if(!res.flag) {
            color += "red";
         }
         else {
            color += "green";
         }
         form.response.style.color = color;
         form.response.innerHTML = res.mess;
      }
   }
   
   xhr.onerror = function() {
      console.log("Error on server side.");
   }

   xhr.send(formData);
});



