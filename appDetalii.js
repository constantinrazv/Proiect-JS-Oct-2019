var list = [];
var i = window.location.search.substring(4);

async function ajax(){
  var response = await fetch(`https://my-emag.firebaseio.com/produse/${i}.json`);
  window.produs = await response.json();
  draw();
  
}

function draw(){
  
  
  var str = "";  

    str+=`
        <div class="one-half column">
          <img src="${produs.imagine}" id="picture-link" class="showcase-img">
        </div>

        <div class="one-half column">
          <h4 id="product-name" class"showcase-heading">${produs.nume}</h4>
          <div>${produs.detalii}</div>        

          <h5 id="product-price">${produs.pret}</h5>

          <div>Stoc: ${produs.stoc}</div>
          <div>Cantitate: <input id="product-cantitate" type="number" stype="width:20px" value="1" min="1"></div>
          
          <input class="button button-primary" type="button" value="Adauga in cos" onclick="addProduct();"></a>
          </span>
        </div>     
    `;
    
  
  document.querySelector("#product-list").innerHTML = str;
}

function showAlert(message, className){
    
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));


  const container = document.querySelector('.container');
  const form = document.querySelector('.row');
  container.insertBefore(div, form);

  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

async function addProduct(){ 
  var response = await fetch(`https://my-emag.firebaseio.com/cos.json`);
  window.cos = await response.json();

  var found = false;
  var cantitate = document.querySelector('#product-cantitate').value;
  var nume = document.querySelector('#product-name').innerHTML;

  if(window.cos!==null){
    for(j in cos){
    var cantitateProd = Number(cos[j].cantitate)+Number(cantitate);
    if(nume == cos[j].nume) {
      found = true;
      if(cantitateProd <= Number(produs.stoc)){
        var response = await fetch(`https://my-emag.firebaseio.com/cos/${j}/cantitate.json`,{
          method: 'put',
          body: cantitateProd
        });
        window.showAlert('Produsul a fost adaugat in cos!', 'success');
      }else{
        window.showAlert('Stoc insuficient!', 'error');
      }
    }
   }
  }

  if(found===false){
    if(Number(cantitate) <= Number(produs.stoc)){

      var obj = {
        imagine: produs.imagine,
        nume: produs.nume,
        pret: produs.pret,
        stoc: produs.stoc,
        cantitate: document.getElementById('product-cantitate').value,
      }
      var response = await fetch(`https://my-emag.firebaseio.com/cos/${i}.json`,{
        method: 'put',
        body: JSON.stringify(obj)
      });
      window.showAlert('Produsul a fost adaugat in cos!', 'success');
    }else{
      window.showAlert('Stoc insuficient!', 'error');
    }
  }  
}

