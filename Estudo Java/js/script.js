const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImg = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

const buttonAltaria = document.querySelector('.button-altaria')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (apiResponse.status == 200) {
        const data = await apiResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon);

    if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    input.value = ''
    searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Not found :/'
        pokemonNumber.innerHTML = ''
        pokemonImg.style.display = 'none'
    }
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
    input.value =''
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
})

buttonAltaria.addEventListener('click', () => {
    searchPokemon = 334;
    renderPokemon(searchPokemon)
})


renderPokemon(searchPokemon);