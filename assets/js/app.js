let cajas = document.getElementsByClassName('propiedades');
let padre = cajas[0].parentNode;
let mensaje = document.querySelector('.mensaje');

const API_KEY = 'c9F_8Je52sboeMhgNnVYwoI8Q4as906KvyKsopD6xWQ';
const categoria = "real-estate" 
const alto = 480
const ancho = 640
const medidas = `&w=${ancho}&h=${alto}&fit=crop`

async function foto_casa_random(){
    let response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${API_KEY}&query=${categoria}${medidas}`)
    let data = await response.json()
    let imagen = await data.urls.custom
    return imagen 
}

//Selección de los botones dentro del contenedor y se agrega el listener.
for (let boton of document.querySelectorAll('.contenido-aside .boton')) {
    boton.addEventListener('click', function () {
        borrar(this);
    });
}

// BORRAR ELEMENTO SELECCIONADO

function borrar(e) {
    let numCaja = Number(e.parentNode.firstElementChild.textContent); // Se guarda el número de caja

    e.parentNode.remove(); // Se quita la caja
    
    // Este código es para renumerar las cajas, el ciclo inicia desde la caja que se borra para ahorrar iteraciones.
    // Si el número de caja es igual al largo del arreglo, simplemente elimina la caja, sin ejecutar ningún ciclo.
    if (numCaja - 1 < cajas.length) {
        for (let i = numCaja - 1; i < cajas.length; i++) {
            cajas[i].firstElementChild.textContent = i + 1;
        }
    }
    mensaje.style.display = 'none';
}

// CREANDO NUEVOS ELEMENTOS:

async function crear() {
    if (cajas.length === 3) {
        // Si ya hay 3 cajas, aparecerá un mensaje en consola diciendo que se ha alcanzado el máximo de cajas posibles
        console.log("Número máximo de cajas alcanzado");
    } else {
        // Si hay menos de 3 cajas, se creará una nueva

      //  <!--article class="propiedades">
     //               <h2>Casa en Venta</h2>
    //                <img src="assets/img/casa_1.jpg" alt="Casa en Venta">
   //                 <h3>Precio: <span>$1,300,000.°°</span></h3>
  //                  <p>Casa con excelente ubicación Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias repellendus nam tempore illum, ad unde quam assumenda, enim consectetur exercitationem dolorum modi corrupti similique.</p>
//                </article>

        let article = document.createElement('article');
        article.className = "propiedades";

        let titulo = "Nueva Casa";

        let imagen;
        await foto_casa_random().then(data => {
            imagen = data;
        });

        let precio = "1500000";
        let parrafo = "Casa con excelente ubicación Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias repellendus nam tempore illum, ad unde quam assumenda, enim consectetur exercitationem dolorum modi corrupti similique."
        
        let numCaja = Number(cajas.length + 1);
        article.setAttribute("data-order", numCaja)

        article.className = 'caja';

        article.innerHTML = `<h2>${titulo}</h2>
                            <img src="${imagen}">
                            <h3>Precio: <span>${precio}</span></h3>
                            <p>${parrafo}</p>`

        // Creando el botón de la caja
        let boton = document.createElement('button');
        let txtBorrar = document.createTextNode('Borrar');
        boton.appendChild(txtBorrar);
        boton.className = 'boton';
        // boton.setAttribute('onclick', 'borrar(this);');
        boton.addEventListener('click', function () { borrar(this) });

        article.appendChild(boton);

        padre.appendChild(article);
    }
}