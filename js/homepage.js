const domStrings = {
   'searchBtn' : document.getElementById('search_btn'),
   'searchBar' : document.getElementById('search_bar'),
   'searchRender' : document.getElementById('search_element'),
   'preferBtn' : document.getElementById('prefer'),
   'recoRender' : document.getElementById('recommend_element')
};

domStrings.searchBtn.addEventListener('click', ()=> {
   const searchValue = domStrings.searchBar.value;
   var formdata = new FormData();
   formdata.append('search',searchValue);
   fetch('../php/home_search.php', {
      method: 'POST',
      body: formdata
   })

   .then((resp) => resp.json())

   .then((data) => {
      template = ``;
      console.log(data);
      if(!data.flag){
         template += `<h2  style="color:white;text-align:center;">No results found.</h2>`;
      }
      else {
var j=9;
	if(data.num<j){
j=data.num;
}
         for(var i = 0; i<j; i++){
            const {prod_id, description, storage, price,processor,ram,os,display} = data.data[i];
            template += `<div id = "${prod_id}" class="panel panel-default box">
                        <p>Description: ${description}</p>
                        <p>Price: ${price}</p>
                        <p>Storage: ${storage}</p>
			<p>Processor: ${processor}</p>
			<p>RAM: ${ram}</p>
			<p>OS: ${os}</p>
			<p>Display: ${display}</p>
                        </div>`;
         }
      }
      domStrings.searchRender.innerHTML  = template;
   })
   .catch((err) => console.log(err))
});

domStrings.preferBtn.addEventListener('click', ()=> {
   var brand = document.querySelector('input[name = "brand"]:checked').value;
   var os = document.querySelector('input[name = "os"]:checked').value;
   var display = document.querySelector('input[name = "display"]:checked').value;
   // var gpu = document.querySelector('input[name = "gpu"]:checked').value;
   var ram = document.querySelector('input[name = "ram"]:checked').value;
   // var screen = document.querySelector('input[name = "screen"]:checked').value;
   var minprice = document.getElementById("minprice").value;
   var maxprice = document.getElementById("maxprice").value;

   var formdata = new FormData();
   formdata.append('brand',brand);
   formdata.append('os',os);
   formdata.append('display',display);

   formdata.append('ram',ram);
   formdata.append('minprice',minprice);
   formdata.append('maxprice',maxprice);
   fetch('../php/recommend.php', {
      method: 'POST',
      body: formdata
   })
   .then((resp)=>resp.json())

   .then((data)=>{
      template = ``;
      if(!data.flag){
         template += `<h2 style="color:white;text-align:center;">No results found.</h2>`;
      }
      else {
	var j=9;
	if(data.num<j){
j=data.num;
}
         for(var i = 0; i<=j; i++){
            const {prod_id, description, storage, price,processor,ram,os,display,rating} = data.data[i];
            template += `<div id = "${prod_id}" class="panel panel-default box">
                        <p>Description: ${description}</p>
                        <p>Price: ${price}</p>
                        <p>Storage: ${storage}</p>
                       	<p>Processor: ${processor}</p>
			<p>RAM: ${ram}</p>
			<p>OS: ${os}</p>
			<p>Display: ${display}</p>
			<p>Rating: ${rating}</p>
                        </div>`;
         }
      }
      domStrings.recoRender.innerHTML  = template;
   })
});

function min_slider(x){
   var template = `Minimum Price: Rs.${x}`;
   document.getElementById("minview").innerHTML = template;
}

function max_slider(x){
   var template = `Maximum Price: Rs.${x}`;
   document.getElementById("maxview").innerHTML = template;
}