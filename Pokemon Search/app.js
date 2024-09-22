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


// Function to get Details of pokemons name, weight, experience,etc.

async function getDetails(name){
    try{
        const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        const data = await res1.json();

        const weight = data.weight;
        const exp = data.base_experience;
        const audio = data.cries.latest;
        const imgUrl = data.sprites.other.home.front_default;
        const pokId = data.id;
        var abilityStr = "";
        const abilities = data.abilities;
        // Get Abilities
        abilities.map((n)=>{
            // return n.ability.name;
            abilityStr += n.ability.name + ", ";
        })
        
        return {name, weight, exp, audio, imgUrl, pokId, abilityStr};
    }
    catch(err){
        console.log('Error',err);
    }
}


// Function to create the audio button and play the audio

function playAudio() {
    // Get the container for the button
    const container = document.getElementById('soundBtnCont');

    // Remove any existing sound button
    const existingButton = document.getElementById('soundBtn');
    if (existingButton) {
        container.removeChild(existingButton);
    }

    // Create a dynamic button
    const btn = document.createElement('button');
    btn.id = 'soundBtn';
    btn.className = 'bg-orange-500 p-3 mt-4 rounded-lg shadow-lg hover:bg-orange-600'; // Use className instead of classList
    btn.textContent = 'Make Noise';
    container.appendChild(btn);

    // Add event listener to play audio
    btn.addEventListener('click', () => {
        const aud = document.getElementById('myAudio');
        aud.play();
    });
}



// Search Button Logic --->

function getContent(){

    const searchParent = document.getElementById('searchBtn');
    
    // Remove only dynamic child elements
    const dynamicItems = searchParent.querySelectorAll('.dynamic-item');
    dynamicItems.forEach(item => {
        searchParent.removeChild(item);
    });

    const nameInput =  document.getElementById('nameInput');
    const pokeNameInput = nameInput.value.trim();

    if(pokeNameInput !== ''){
        const pokeName = pokeNameInput.toLowerCase();

        pokemons()
        .then(nameList =>{
                if(nameList.includes(pokeName)){
                    // Get Details of Pokemon
                    getDetails(pokeName)
                    .then(data =>{
                        document.getElementById('pokeName').textContent = data.name;
                        document.getElementById('weight').innerHTML = "<span><b>Weight : </b></span>" + data.weight;
                        document.getElementById('pokId').innerHTML = "<span><b>Pokemon Id : </b></span>" + data.weight;
                        document.getElementById('exp').innerHTML = "<span><b>Base Experience : </b></span>" + data.exp;
                        document.getElementById('ability').innerHTML = "<span><b>Abilities : </b></span>" + data.abilityStr;
                        document.getElementById('pokeImg').src = data.imgUrl;
                        document.getElementById('myAudio').src = data.audio;
                    })

                    playAudio();
                }
                else{
                    alert('Name not found :(')
                }
        })
    }
}


document.getElementById('searchBtn').addEventListener('click', getContent)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getContent();
    }
});

