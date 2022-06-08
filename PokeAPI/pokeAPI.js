let url = 'https://pokeapi.co/api/v2/pokemon/';

let arrayNombre = [];


const collectionLabels = document.getElementsByName("label");
const collectionFotos = document.getElementsByName("fotoPokemon");

let promise = fetch(url)
        .then(response => response.json())
        .then(dataR => datosObtenidos(dataR));


function datosObtenidos(data){
    data.results.forEach(function myFunction(item, index) {

        //Foto a Array
        index++;
        fetch(url+ index +'/').then(response => response.json()).then(data => mostrarFoto(index, data.sprites.other.dream_world.front_default))

        //Nombre a Array, bien escrita
        arrayNombre.push(escribirNombreBien(item.name));

    });
    // Desapila el array
    mostrarNombre(arrayNombre);
}

function mostrarNombre(lista){
    for(let i = 0; i < collectionLabels.length; i++){
        collectionLabels[i].innerHTML = lista.shift();
    }
}

function mostrarFoto(num, link){
    num--;
    collectionFotos[num].src=link;
}


function escribirNombreBien(s){
    let res = s.charAt(0).toUpperCase() + s.slice(1);
    return res;
}
