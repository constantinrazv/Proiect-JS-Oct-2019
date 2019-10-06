var list = [];

async function ajax(){
  var response = await fetch("https://my-emag.firebaseio.com/produse.json");
  window.list = await response.json();
  draw();
  
}

function draw(){
  var str = "";

  for(var i in list){

    str+=`
    
    <tr>
      <td>
        <div class="four columns">
          <img src="${list[i].imagine}" class="showcase-img">
          <div>${list[i].nume}</div>
          <span>${list[i].pret}
          <a href="detalii.html?id=${i}">
          <input class="button-primary" type="button" value="Detalii" /></a>
          </span>
        </div>
      </td>
    </tr>
    
    `;
    
  }
  document.querySelector("#product-list").innerHTML = str;
}