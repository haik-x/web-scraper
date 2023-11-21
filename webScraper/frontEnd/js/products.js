import {
    getProducts, addProduct, deleteProduct
} from '../controllers/products.js';


$(function() {
    function makePost() {
        const inputUrl = document.getElementById("inputURL");
        console.log(inputUrl.value)
        addProduct({link: inputUrl.value})
        location.reload(true);
    }
 // Adding event onClick to button
 $('#botonAgregar').on('click', makePost);                            
 }); 



$(document).ready(() =>{
    getProducts().then((value) => {
        console.log(value);
        // Expected output: "Success!"
        const baseDiv = document.getElementById("baseGalery");
        let isFirst = false;
        $.each(value, function(indice, entry){
            console.log(indice)
            console.log(entry)
            const element = document.createElement("div");
            element.classList.add("producto");
            element.setAttribute("id", entry.id);
            baseDiv.appendChild(element);

            const imagen = document.createElement("img");
            // element.classList.add("producto");
            imagen.setAttribute("src", entry.linkImg);
            imagen.setAttribute("alt", "Producto");
            element.appendChild(imagen);

            const brSimple01 = document.createElement("br");
            // element.classList.add("producto");
            element.appendChild(brSimple01);

            const span01 = document.createElement("span");
            span01.classList.add("precioC");
            span01.innerHTML = "$ " + entry.precio;
            element.appendChild(span01);

            const brSimple02 = document.createElement("br");
            // element.classList.add("producto");
            element.appendChild(brSimple02);

            const span02 = document.createElement("span");
            span02.classList.add("descuento");
            span02.innerHTML = entry.descuento + " %";
            element.appendChild(span02);

            const brSimple03 = document.createElement("br");
            // element.classList.add("producto");
            element.appendChild(brSimple03);

            
            const nombre = document.createElement("span");
            nombre.classList.add("nombre");
            nombre.innerHTML = entry.nombreProducto;
            element.appendChild(nombre);

            const brSimple04 = document.createElement("br");
            // element.classList.add("producto");
            element.appendChild(brSimple04);

            const verProducto = document.createElement("a");
            verProducto.classList.add("ver");
            verProducto.setAttribute("href", "verProducto.html");
            verProducto.innerHTML = "Ver";
            element.appendChild(verProducto);// button

            const brSimple05 = document.createElement("br");
            // element.classList.add("producto");
            element.appendChild(brSimple05);

            const deleteOption = document.createElement("button");
            // element.classList.add("producto");
            deleteOption.setAttribute("id", "botonDelete");
            deleteOption.innerHTML = "Delete";
            element.appendChild(deleteOption);
            deleteOption.addEventListener('click', (event) => {
                deleteProduct(event.currentTarget.parentElement.id);
                location.reload(true);
              });

        });
      });

})
