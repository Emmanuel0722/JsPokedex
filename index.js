const url = `https://pokeapi.co/api/v2/pokemon/`;

/////////////////////// PROGRAMANDO EL BUSCADOR DE POKEMONES \\\\\\\\\\\\\\\\\\\\\\\

const btn = document.getElementById('btn');
const formSearch = document.getElementById('form-search');
const empty = document.querySelector('.empty');
const search = document.getElementById('search');
const btnt = document.getElementById('btnt');
const ball = document.createElement('img');
const mess = document.createElement('div');
const html = document.createElement('p');

function sendPokemon(id) {
    try {

        const poke = new Pokemon();
        
        if (id != "") {
            
            fetch(url + id)
            .then(res => res.json())
            .then(data =>{
                poke.addPokemon(data);
            }
        );
        }else {
            messagge('Ingrese el ID por favor!');
        }
    } catch (error) {
        messagge('ID no Existe!');
    }
}

btnt.addEventListener('click', () => {
    
    try {
        
        if (search.value !== "") {
            if (search.value > 0 && search.value < 906) {
                pokeball();
                atraparPokemon(search.value);
                formSearch.reset();
                search.focus();
            }else{
                messagge('Ese Pokemon no existe!!')
            }
        } else {
            messagge('Busque al Pokemon!');
        }
    } catch (error) {
        messagge("Uff, no tienes pokebolas!");
        console.log(error);
    }
});

function pokeball(){
    const card = document.getElementById('pokelist');
    removeChildNodes(card);
    const randomNum = parseInt(Math.random(0)* 6);
    const i = `./img/${randomNum}.png`;

    ball.src = i;

    card.appendChild(ball);
    messagge("Capturado!");
    setTimeout(()=>{
        ball.remove();
    }, 3000);
}

function atraparPokemon(id){
    const poke = new Pokemon();
    fetch(url + id)
            .then(res => res.json())
            .then(data =>{
                poke.caughtPokemon(data);
            })
}

btn.addEventListener('click', ()=>{
    try {
        const search = document.getElementById('search').value;
        if (search > 0 && search < 906) {
            sendPokemon(search);
        }else{
            messagge('Ese Pokemon no Existe!')
            formSearch.reset();
        }
    } catch (error) {
        console.log(error);
    }
});

function SoloNumeros(event) {
    try {
        if ((event.keyCode < 48) || (event.keyCode > 57)){ 
            event.returnValue = false;

            messagge('Solo Numeros!')
        }
    } catch (error) {
        console.log(error);
    }
}

function seachPokemon(event){
    event.preventDefault();
}

function messagge(messe) {
    mess.textContent = messe;
    mess.classList = 'text-center text-danger';
    empty.appendChild(mess);
    
    search.focus();
    
    setTimeout(()=>{
        mess.remove();
    }, 3000);
}

/////////////////////// PROGRAMANDO EL LISTADO DE POKEMONES \\\\\\\\\\\\\\\\\\\\\\\

const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const trPokemon = document.querySelector('.trPokemon');
const message = document.getElementById('message');
const trCaughtPokemon = document.querySelector('.trCaughtPokemon');

let offset = 1;
let limit = 6;

previous.addEventListener('click', () => {
    try {
        if(offset != 1){
            offset -= 7;
            fetchPokemons(offset, limit);
            removeChildNodes(trPokemon);
        }else{
            
            html.classList.add('text-danger');
            html.textContent = 'Ya no existen mas Pokemones!';

            message.appendChild(html);

            setTimeout(()=>{
                html.remove();
            }, 3000);

        }
    } catch (error) {
        console.log(error);
    }
});

next.addEventListener('click', () => {
    try {

        if (offset > 0 || offset < 905) {
            offset += 7;
            removeChildNodes(trPokemon);
            fetchPokemons(offset, limit);
        }else{
            html.classList.add('text-danger');
            html.textContent = 'Ya no existen mas Pokemones!';

            message.appendChild(html);

            setTimeout(()=>{
                html.remove();
            }, 3000);

        }
    } catch (error) {
        console.log(error);
    }
});

////////////////////// CLASES!! \\\\\\\\\\\\\\\\\\\\\\\\

class UI{
    addList(pokemon) {

        const poke_type = pokemon.types.map(type => type.type.name.toUpperCase())

        var table = `
                    <tr class="trPokemon">
                        <td>#${pokemon.id.toString().padStart(3, 0)}</td>
                        <td>${pokemon.name.toUpperCase()}</td>
                        <td>${poke_type}</td>
                    </tr>
                    `;

        trPokemon.innerHTML += table;
    }
}

class Pokemon{
    constructor(id, name, img){
        this.id = id;
        this.name = name;
        this.img = img;
    }

    addPokemon(poke){
        
        const ima = poke.sprites.front_default;

        const pokeData = document.createElement('li');
        pokeData.textContent = poke.id;

        const pokeName = document.createElement('li');
        pokeName.textContent = poke.name.toUpperCase();

        const pokeimg = document.createElement('img');
        pokeimg.src = ima;
        
        const pokeLiImg = document.createElement('li');
        pokeLiImg.appendChild(pokeimg);

        const pokelist = document.querySelector('.pokelist');
        removeChildNodes(pokelist);
        pokelist.appendChild(pokeLiImg);
        pokelist.appendChild(pokeData);
        pokelist.appendChild(pokeName);
        search.focus();
    }

    caughtPokemon(pokemon){
        try {
                const poke_type = pokemon.types.map(type => type.type.name.toUpperCase());
                
                const table = `<tr class="trPokemon text-center">
                    <td>#${pokemon.id.toString().padStart(3, 0)}</td>
                    <td>${pokemon.name.toUpperCase()}</td>
                    <td>${poke_type}</td>
                    <td><button name="btnDelete" style="color: Red; border: none; background-color: white;">X</button></td>
                </tr>`;

                trCaughtPokemon.innerHTML += table;
        } catch (error) {
            console.log(error);
        }
    }

    deletePokemon(e){
        if (e.name === 'btnDelete') {
            e.parentElement.parentElement.remove();
        }
    }
}

trCaughtPokemon.addEventListener('click', function(e) {
    const p = new Pokemon();
    p.deletePokemon(e.target);
});

//////////////////// PokeAPI \\\\\\\\\\\\\\\\\\\\\\\\

const fetchPokemon = async (id) => {
    const ui = new UI();
        await fetch(`https://pokeapi.co/api/v2/pokemon/` + id)
        .then((res) => res.json())
        .then((data) => {
            ui.addList(data);
        }
    );
}

async function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
        await fetchPokemon(i);
    }
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit);