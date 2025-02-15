//CONSTANTE QUE ARMAZENA A LISTA QUE É ENVIADA PELA OL "pokemons" COM ID "pokemonOl"->
const pokemonList = document.getElementById('pokemonOl');

const loadMoreButton = document.getElementById('loadMore')
const maxRecords = 151
let offset = 0;
const limit = 30;

//RESPONSAVEL PELA CONVERSÃO DAS INFORMAÇÕES EM TEXTOS HMTL DIRETAMENTE NO ARQUIVO HTML->
function loadPokemonsItem(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemonLi ${pokemon.type}">
            <span class="number">
                ${pokemon.number}
            </span>
            <span class="name">
                ${pokemon.name}
            </span>
            <div class="detail">
                <ol class="tipoPokemon">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img class="pokeimage" src="${pokemon.photo}"
                // alt="${pokemon.name}">
            </div>
        </li>`
        ).join('');

        pokemonList.innerHTML += newHtml
    })
}
loadPokemonsItem(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit
    
    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonsItem(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonsItem(offset, limit)
    }
})

