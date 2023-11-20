import {
    getProducts
} from '../controllers/products.js';

$(document).ready(() =>{
    getProducts().then((value) => {
        console.log(value);
        // Expected output: "Success!"
      });

/*     $('#importJson').click(function() {
        console.log("Gra is here");
         $.ajax({
            type: 'GET',
            url: 'https://jsonplaceholder.typicode.com/albums',
            dataType: 'json'
        
        }).done((data) => {
            $.each(data, function(indice, album){
                let fila = $('<tr>');
                fila.append($(`<td>${album.userId} </td>`));
                fila.append($(`<td>${album.id} </td>`));
                fila.append($(`<td>${album.title} </td>`));

                $('#albums tbody').append(fila);
                
                
            });

            $('#albums').show();
        }) 
    }) */
})