//Chama a API->
const pokeApi = {};

function convertPokemonDetailToPokemodel(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon
}

//FUNÇÃO QUE FAZ A CHAMADA DOS DADOS DENTRO DO POKEMON DENTRO DA URL->
pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonDetailToPokemodel) 
}

//OFFSET: PARAMETRO DE INICIO DE CONTAGEM COM BASE NA POSIÇÃO 0
//LIMIT: PARAMETRO PARA ATÉ ONDE SERÃO LIDOS OS DADOS RECEBIDOS
pokeApi.getPokemons = (offset = 0, limit = 5) => {

    //CONSTANTE QUE ARMAZENA UM LINK COM DADOS PARA A API->
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    //RESPONSAVEL PELO RETURN DO DOCUMENTO ARMAZENADO NA CONSTANTE "url"->
    return fetch(url)
        //RESPONSAVEL PELA REQUEST DA API SER TRANSFORMADA EM JSON->
        .then((response) => response.json())
        //RESPONSAVEL PELA RESPONSE DA API QUANDO BEM EXECUTADA->
        .then((JsonBody) => JsonBody.results)
        //RESPONSAVEL PELO MAPEAMENTO DOS DADOS RETORNADOS PELA URL PARA LEITURA DOS DETALHES DO POKEMON->
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        //RESPONSAVEL POR QUE TODAS AS PROMISES DO "detailRequest" SEJAM LIDAS E RETORNADAS A ELE->
        .then((detailRequest) => Promise.all(detailRequest))
        //RETORNA OS DETALHES DO POKEMON EM "pokemonsDetail"
        .then((pokemonsDetails) => pokemonsDetails)
}


