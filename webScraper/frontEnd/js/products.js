import {
    getProducts, addProduct, deleteProduct, updateProduct
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

 $(function() {
    function makePost() {
       const isCheck = $('#inputRequestAmigos').is(':checked');
       getAllProducts(isCheck);
    }
 // Adding event onClick to button
 $('#inputRequestAmigos').on('change', makePost);                            
 }); 


 
    function getAllProducts(includeFriends) {
        getProducts(includeFriends).then((value) => {
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
    
                const imgDiv = document.createElement("div");
                imgDiv.setAttribute("class", "imgDiv");
                element.appendChild(imgDiv);
    
                    const imagen = document.createElement("img");
                    imagen.setAttribute("src", entry.linkImg);
                    imagen.setAttribute("alt", "Producto");
                    imgDiv.appendChild(imagen);
    
                const infoDiv = document.createElement("div");
                infoDiv.setAttribute("class", "infoDiv");
                element.appendChild(infoDiv);
                    const brSimple06 = document.createElement("br");
                    infoDiv.appendChild(brSimple06);
    
                    const nombre = document.createElement("span");
                    nombre.classList.add("nombre");
                    nombre.innerHTML = entry.nombreProducto;
                    infoDiv.appendChild(nombre);
    
                    const brSimple04 = document.createElement("br");
                    infoDiv.appendChild(brSimple04);
    
                    const brSimple01 = document.createElement("br");
                    infoDiv.appendChild(brSimple01);
    
                    const span01 = document.createElement("span");
                    span01.classList.add("precioC");
                    span01.innerHTML = "Precio $ " + entry.precio;
                    infoDiv.appendChild(span01);
    
                    const brSimple02 = document.createElement("br");
                    infoDiv.appendChild(brSimple02);
    
                    const span02 = document.createElement("span");
                    span02.classList.add("descuento");
                    span02.innerHTML = "Descuento " + entry.descuento + " %";
                    infoDiv.appendChild(span02);
    
                    const brSimple03 = document.createElement("br");
                    infoDiv.appendChild(brSimple03);
    
                    const brSimple05 = document.createElement("br");
                    infoDiv.appendChild(brSimple05);
    
                const actionsDiv = document.createElement("div");
                actionsDiv.setAttribute("class", "actionsDiv");
                element.appendChild(actionsDiv);
    
                if(!entry.email){
                    const updateOption = document.createElement("button");
                    updateOption.setAttribute("id", "botonUpdate");
                    updateOption.innerHTML = "Update";
                    actionsDiv.appendChild(updateOption);
                    updateOption.addEventListener('click', (event) => {
                        updateProduct(event.currentTarget.parentElement.id);
                        location.reload(true);
                    });
    
                    const deleteOption = document.createElement("button");
                    deleteOption.setAttribute("id", "botonDelete");
                    deleteOption.innerHTML = "Delete";
                    actionsDiv.appendChild(deleteOption);
                    deleteOption.addEventListener('click', (event) => {
                        deleteProduct(event.currentTarget.parentElement.id);
                        location.reload(true);
                        });
                }else{
                    const emailAmigo = document.createElement("span");
                    emailAmigo.classList.add("emailAmigo");
                    emailAmigo.innerHTML = "Amigo: " + entry.email;
                    infoDiv.appendChild(emailAmigo);
                }

    
            });
          });
    }



$(document).ready(() =>{
    getAllProducts(false);
})
