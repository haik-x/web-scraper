//dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err, result) {

import {
    getFriends, addFriend
} from '../controllers/user.js';

////
 


$(document).ready(() =>{
    getFriends().then((value) => {
        console.log(value);
        // Expected output: "Success!"
        const baseDiv = document.getElementById("people");
        let isFirst = false;
        $.each(value, function(indice, entry){
            console.log(indice)
            console.log(entry)
            const element = document.createElement("div");
            element.classList.add("personInfo");
            element.setAttribute("id", entry.id);

            baseDiv.appendChild(element);

                const infoDiv = document.createElement("div");
                infoDiv.setAttribute("class", "infoDiv");
                element.appendChild(infoDiv);

                    const person = document.createElement("span");
                    person.classList.add("person");
                    person.innerHTML = entry.email;
                    infoDiv.appendChild(person);

                    const brSimple03 = document.createElement("br");
                    infoDiv.appendChild(brSimple03);

                    const brSimple05 = document.createElement("br");
                    infoDiv.appendChild(brSimple05);

            const actionsDiv = document.createElement("div");
            actionsDiv.setAttribute("class", "actionsDiv");
            element.appendChild(actionsDiv);

                const addOption = document.createElement("button");
                addOption.setAttribute("id", "botonAdd");
                addOption.setAttribute("email", entry.email);
                addOption.innerHTML = "Agregar";
                actionsDiv.appendChild(addOption);
            
                addOption.addEventListener('click', (event) => {
                    /////////
                        const gra = event.currentTarget.attributes.email.value;
                        addFriend(event.currentTarget.attributes.email.value);
                    });
/*
                const deleteFriend = document.createElement("button");
                addOption.setAttribute("id", "botonDelete");
                addOption.innerHTML = "Eliminar";
                actionsDiv.appendChild(addOption);
                addOption.addEventListener('click', (event) => {
                    /////////
                    deleteFriend(event.currentTarget.parentElement.id);
                    location.reload(true);
                    });
 */
        });
      });

})
