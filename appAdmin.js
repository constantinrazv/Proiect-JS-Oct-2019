// load existing values from fb
var list = [];
var idxEditare = -1;

async function ajax(){
  var response = await fetch("https://my-emag.firebaseio.com/produse/.json");
  window.list = await response.json();
  draw();
  
}

function draw(){
  
  var str = "";

  for(var i in list){

    str+=`
    <tr>
    <div><td><img src="${list[i].imagine}"></td></div>
    <div><td>${list[i].nume}</td></div>
    <div><td>${list[i].stoc}</td></div>
    <div><td>${list[i].pret}</td></div>
    <td>
      <a href="editare.html?id=${i}">Edit</a>
      
      <a href="#" class="delete" value="Del" onclick="sterge('${i}');">X</a>
		</td>
  </tr>
    `;
    
  }
  document.getElementById("product-list").innerHTML = str;
  
}

// admin sterge
async function sterge(i){    
  var response = await fetch(`https://my-emag.firebaseio.com/${i}.json`,{
   method:"delete"
    }); 
    ajax(); 
  }

  function showAlert(message, className){
    
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));


    const container = document.querySelector('.container');
    const form = document.querySelector('#electronic-form');
    container.insertBefore(div, form);

    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

//Get form values
async function add(event){
  event.preventDefault();

  const name = document.getElementById('product-name').value;
  const stoc = document.getElementById('product-stoc').value;
  const price = document.getElementById('product-price').value;
  const detalii = document.getElementById('product-details').value;
  const poza = document.getElementById('picture-link').value;

  if(name==="" || stoc==="" || price==="" || detalii==="" || poza===""){
    window.showAlert('Please fill in all fields', 'error');
  }else{

  var obj = {
    imagine: document.getElementById('picture-link').value,
    stoc: document.getElementById('product-stoc').value,
    nume: document.getElementById('product-name').value,
    pret: document.getElementById('product-price').value,
    detalii: document.getElementById('product-details').value,
  }
  
  var response = await fetch("https://my-emag.firebaseio.com/.json",{
    method: 'post',
    body: JSON.stringify(obj)
  });
  window.showAlert('Produs Adaugat!', 'success');
  }
  //console.log(name, stoc, price);
  ajax();
  
}