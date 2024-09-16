
// Access all the pokemons names

const pokemons = async function(){
    try{
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        const res = data.results;

        const nameList = res.map((pokNames)=> pokNames.name);
        return nameList;
    }
    catch(err){
        console.log('ERROR',err);
    }
};


// Access all the moves of a pokemon

const pokeMoves = async function(url){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${url}/`);
        const data = await response.json();
        const movesData = data.moves;

        const allMoves = movesData.map((f)=>{
            return f.move.name;
        })
        return allMoves;
    }
    catch(err){
        console.log('ERROR',err);
    }
};


// This function displays the data in the page

const renderMoves = (movesData) => {
    const moveList = document.getElementById('moveList');
    moveList.innerHTML = ''; // Clear previous content
    movesData.forEach(move => {
      const nameItem = document.createElement('div');
      nameItem.className = 'bg-white p-4 rounded shadow text-center';
      nameItem.textContent = move;
      moveList.appendChild(nameItem);
    });
  };


// Call this function when Generate button is pressed

function getName(){
const pokeList = document.getElementById('pokeList');
if (pokeList.hasChildNodes()) {
    // Loop through and remove all li elements if they exist
    while (pokeList.firstChild) {
        pokeList.removeChild(pokeList.firstChild);
    }
}
pokemons()
.then(data =>{
    const randNum = Math.floor(Math.random() * 20);
    // console.log(data[randNum]);
    const name = document.createElement('li');
    name.classList.add('flex', 'justify-between', 'items-center', 'bg-gray-100', 'p-2', 'mb-2', 'rounded-lg', 'shadow-sm');

    name.innerHTML = `<span class="text-gray-800"><span class="font-medium">Pokemon Name : </span>${data[randNum]}</span>
                <button class="getMovesBtn bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Get Moves</button> `;

    pokeList.appendChild(name);


    // Get Moves of the Pokemon -->
    document.querySelector('.getMovesBtn').addEventListener('click', ()=>{
        pokeMoves(data[randNum]).then((movesData)=>{
            renderMoves(movesData);
        })
    })

})
.catch(err =>{
    console.log(err);
})
}

// Generate Button Logic

document.getElementById('genBtn').addEventListener('click',getName)
