var list = [];
var idxEditare = -1;

async function ajax(){
  var response = await fetch("https://my-emag.firebaseio.com/cos/.json");
  window.list = await response.json();
  draw();
  
}

function draw(){
  
  var str = "";

  for(var i in list){
    if(list[i]===null) continue;
   
    str+=`
    <div class="cart-row">
    <div class="cart-item cart-column">
            <img class="cart-item-image" src="${list[i].imagine}" width="80" height="80">
            <a href="detalii.html?id=${i}"><span class="cart-item-title">${list[i].nume}</span></a>
        </div>

        <span id="pret" class="cart-price cart-column">${list[i].pret}</span>
        
        <div class="cart-quantity cart-column" >        
            <input id="inputQuantity" class="cart-quantity-input" type="number" min="0" value="${list[i].cantitate}"  onchange="quantityChange(this,event,'${i}');">

        </div>
        <div class="cart-quantity cart-column">
        <span id="subTotal" class="cart-subtotal cart-column"></span>
        
        </div>
        <div class="cart-quantity cart-column">
        <button class="btn btn-danger" type="button" onclick="sterge('${i}');">REMOVE</button>
        </div>
        </div>`;
    
  }
  document.querySelector(".cart-items").innerHTML = str;
  updateCartTotal()
  
}

async function sterge(i){    
  var response = await fetch(`https://my-emag.firebaseio.com/cos/${i}.json`,{
   method:"delete"
    }); 
    ajax(); 
    updateCartTotal()
    
  }

function updateSubTotal(){
 for(i in list){
  subTotal = (list[i].cantitate * parseInt(list[i].pret.replace('$', '')))
  
 }
 document.querySelector('#subTotal').innerHTML = '$'+subTotal;
}

function updateCartTotal(){
  var cartContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartContainer.getElementsByClassName('cart-row');
  total = 0;
  for(var i=0; i<cartRows.length;i++){
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    var price = parseInt(priceElement.innerHTML.replace('$', ''));
    var quantity=quantityElement.value;
    total+=(price*quantity);
  }
  total=Math.round(total*100)/100
  document.getElementsByClassName('cart-total-price')[0].innerHTML = '$'+total;
}

async function quantityChange(elem,event, i){
  
  var input = elem.value;
  
    if(list[i].cantitate>0){
      var response = await fetch(`https://my-emag.firebaseio.com/cos/${i}/cantitate.json`,{
        method:"put",
        body: parseInt(input)
    });

    }else if(list[i].cantitate < list[i].stoc){
      var response = await fetch(`https://my-emag.firebaseio.com/cos/${i}/cantitate.json`,{
        method:"put",
        body: parseInt(input)
    });
  
  input=1;
  }  
  updateCartTotal();
  updateSubTotal();
}



