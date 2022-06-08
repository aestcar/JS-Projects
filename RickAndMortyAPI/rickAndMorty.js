let url = 'https://rickandmortyapi.com/api/character';
let urlLoca = 'https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100';
let urlFiltro = 'https://rickandmortyapi.com/api/character/?name=';


const divPrincipal = document.getElementById("tabla");

let promise = fetch(urlLoca)
        .then(response => response.json())
        .then(dataR => datosObtenidos(dataR));


// Datos obtenidos        
function datosObtenidos(data){
    data/*.results.*/.forEach(function myFunction(personaje, index) {
        divPrincipal.innerHTML = `
            ${divPrincipal.innerHTML}
            <div class="bloque">
                <div class="imagen"><img name="fotoRick ${personaje.name}" src="${personaje.image}" alt="${personaje.name}" float:right;width: auto;height: auto;"></div>
                <p class="nombre">${escribirNombreBien(personaje.name)}</p>
                <p class="labelNum"> (${personaje.species})</p>
                <p class="estado">${escribirEstadoBien(personaje.status)}</p>
            </div>
        `;
    });
    aplicarEsteticos();
}

function datosObtenidosFiltro(data){
    data.results.forEach(function myFunction(personaje, index) {
        index++;
        divPrincipal.innerHTML = `
            ${divPrincipal.innerHTML}
            <div class="bloque">
                <div class="imagen"><img name="fotoRick ${personaje.name}" src="${personaje.image}" alt="${personaje.name}" float:right;width: auto;height: auto;"></div>
                <p class="nombre">${escribirNombreBien(personaje.name)}</p>
                <p class="labelNum">(${personaje.species})</p>
                <p class="estado">${escribirEstadoBien(personaje.status)}</p>
            </div>
        `;
    });
    aplicarEsteticos();
}
// Fin Datos obtenidos  

function escribirNombreBien(s){
    let res = s.charAt(0).toUpperCase() + s.slice(1);
    return res;
}

function escribirEstadoBien(s){
    if(s == "Alive"){
        return "Vivo";
    } else if(s == "Dead") {
        return "Muerto";
    } else {
        return "Desconocido";
    }
}

function aplicarEsteticos(){
    const estados = document.getElementsByClassName("estado");
    for (let i = 0; i < estados.length; i++) {
        if(estados[i].innerText == "Vivo"){
            estados[i].style.color = "#32CD32";
        }else if(estados[i].innerText == "Muerto"){
            estados[i].style.color = "red";
        }
   }
}


// Filtro 
function buscar() {
    let input = document.getElementById('barraBuscar').value
    input = input.toLowerCase();

    borrarBloquesVisibles();
      
    let promise = fetch(urlFiltro+input)
        .then(response => response.json())
        .then(dataR => datosObtenidosFiltro(dataR));
}

function borrarBloquesVisibles(){
    const bloquesVisibles = document.getElementsByClassName('bloque');
    while(bloquesVisibles.length > 0){
        bloquesVisibles[0].parentNode.removeChild(bloquesVisibles[0]);
    }
}

