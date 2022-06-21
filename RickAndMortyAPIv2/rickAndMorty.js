let url = 'https://rickandmortyapi.com/api/character/?page=';
let urlLoca = 'https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100';
let urlFiltro = 'https://rickandmortyapi.com/api/character/?name=';
let urlEpisodios = 'https://rickandmortyapi.com/api/episode/';

let indice = 1;

const divPrincipal = document.getElementById("tabla");

hacerFetch(url+indice);
        
function datosObtenidos(data){
    data.results.forEach(function myFunction(personaje, index) {
        divPrincipal.innerHTML = `
            ${divPrincipal.innerHTML}
            <div class="bloque">
                <div class="divImagen">
                    <img name="fotoRick ${personaje.name}" src="${personaje.image}" alt="${personaje.name}"">
                </div>
                <div class="infoPers">
                    <div class="divNombre">
                        <h2 class="nombre">${escribirNombreBien(personaje.name)}</h2>
                        <p class="estado"><span class="circulo"></span> ${personaje.status} - ${personaje.species}</p>
                    </div><br/>
                    <div class="divLocalizacion">
                        <p class="enunciado">Last known location:</p>
                        <p class="respuesta">${personaje.location.name}</p>
                    </div><br/>
                    <div class="divEpisodio">
                        <p class="enunciado">First seen in:</p>
                        <p class="episodio">${obtenerIDEpisodio((personaje.episode)[0])}</p>  
                    </div>
                </div>    
            </div>
        `;
    });
    aplicarEsteticos();
    anyadirEpisodios();
} 

function escribirNombreBien(s){
    let res = s.charAt(0).toUpperCase() + s.slice(1);
    return res;
}

async function anyadirEpisodios(){   
    let res = await fetch(urlEpisodios);
    let parsed = await res.json();
    // Lista only 20 episodios
    let resultados = await parsed.results;

    const episodios = document.getElementsByClassName('episodio');
    console.log(episodios);

    for (let item of episodios) {
        for(i = 0; i < resultados.length; i++){
            // Solo lista los 20 primeros
            if(item.innerText == resultados[i].id ){
                item.innerText = resultados[i].name;
                console.log(resultados.length);
            }else{
                // https://rickandmortyapi.com/api/episode/?page=2
            }
        }
    }
}

function obtenerIDEpisodio(s){
    let result = s.replace("https://rickandmortyapi.com/api/episode/", "");
    return result;
}

async function getNameEpisode(s){
    let fres = await fetch(s)
    let parsed = await fres.json();
    console.log(parsed.name);
    return parsed.name;
}

async function hacerFetch(url){
    let fres = await fetch(url)
    let parsed = await fres.json();
    datosObtenidos(parsed);
}

function aplicarEsteticos(){
    const estados = document.getElementsByClassName("estado");
    const circulos = document.getElementsByClassName("circulo");
    for (let i = 0; i < estados.length; i++) {
        if(estados[i].innerText.includes("Alive")){
            circulos[i].style.backgroundColor  = "#32CD32";
        }else if(estados[i].innerText.includes("Dead")){
            circulos[i].style.backgroundColor  = "red";
        }
   }
}

function next(){
    if(indice != 42){
        indice++;
        borrarBloquesVisibles();
        hacerFetch(url+indice);
        cambiarPagina(indice);
    }
}

function prev(){
    if(indice != 1){
        indice--;
        borrarBloquesVisibles();
        hacerFetch(url+indice);
        cambiarPagina(indice);    
    }
}

function cambiarPagina(indice){
    const labelPag = document.getElementById("indPag");
    labelPag.innerText = 'Página '+indice;
}

// Filtro 
function buscar() {
    let input = document.getElementById('barraBuscar').value
    input = input.toLowerCase();

    borrarBloquesVisibles();
      
    hacerFetch(urlFiltro+input);
}

function borrarBloquesVisibles(){
    const bloquesVisibles = document.getElementsByClassName('bloque');
    while(bloquesVisibles.length > 0){
        bloquesVisibles[0].parentNode.removeChild(bloquesVisibles[0]);
    }
}

