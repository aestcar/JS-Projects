let url = 'https://pokeapi.co/api/v2/pokemon/';


const divPrincipal = document.getElementById("tabla");

let promise = fetch(url)
        .then(response => response.json())
        .then(dataR => datosObtenidos(dataR));

function datosObtenidos(data){
    data.results.forEach(function myFunction(pokemon, index) {
        index++;
        console.log(pokemon.url);
        divPrincipal.innerHTML = `
            <!-- Si quito esto solo se ve el raticate -->
            ${divPrincipal.innerHTML}
            <div class="bloque" onclick="window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');">
                <img name="fotoPokemon ${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png" alt="${pokemon.name}" style="float:left;max-width: 300px;max-height: 300px;">
                <p class="label">${escribirNombreBien(pokemon.name)}</p>
                <p class="labelNum">Nº ${index}</p>
            </div>
        `;
    });
}

function escribirNombreBien(s){
    let res = s.charAt(0).toUpperCase() + s.slice(1);
    return res;
}
