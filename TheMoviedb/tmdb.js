let url = 'https://www.themoviedb.org/';
let trendingURL = 'search/trending?';

let urlBase = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=ab73c44427129f194b2755c851022057';

let urlTren = urlBase + '/discover/movie?sort_by=trending&group=this-week&' + API_KEY;
let urlTren2  = urlBase + '/trending/all/day?' + API_KEY;

const imgPath = 'https://image.tmdb.org/t/p/w500';

const divPrincipal = document.getElementById("tabla");

/* hacerFetch(url+trendingURL); */
hacerFetch(urlTren2);

async function hacerFetch(url){
    let fres = await fetch(url);
    console.log(fres);
    let parsed = await fres.json();
    console.log(parsed);
    datosObtenidos(parsed);
}

function datosObtenidos(data){
    data.results.forEach(function myFunction(pelicula, index) {
        divPrincipal.innerHTML = `
            ${divPrincipal.innerHTML}
            <div class="bloque">
                <div class="divImagen">
                    <img class="fotos" alt="fotoPelicula ${obtenerNombre(pelicula)}" src="${imgPath + pelicula.poster_path}">
                </div>
                <div class="infoPeli">
                    <p class="nombrePeli">${obtenerNombre(pelicula)}</p>
                </div>    
            </div>
        `;
    });
} 

function obtenerNombre(s){
    if(typeof(s.title) == "undefined"){
        return s.name;
    } else{
        return s.title;
    }
}