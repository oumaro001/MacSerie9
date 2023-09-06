document.getElementById("year").textContent = new Date().getFullYear() + " Oumaro / MacSerie9";
let block_actor = document.getElementById('block_actor');
let nameSearch;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjhmMWUxM2VjYTc5OWQxMmVmNmNjZWViZjVjNjQ5MyIsInN1YiI6IjY0ZTBlNTE0MzcxMDk3MDEzOTQ4ZTM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y_sZyDJi2cnH15uAdvP_VZDKBf0z9Kqa6zEqkh0PhfM';

const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'accept': 'application/json'
};


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("searchForm");

    form.addEventListener("submit", function (event) {

        block_actor.innerHTML = " ";
        event.preventDefault(); // Empêche la soumission du formulaire par défaut

        // Récupérer les valeurs des champs
        nameSearch = document.getElementById("search").value;

        const url = `https://api.themoviedb.org/3/search/person?query=${nameSearch}&include_adult=false&language=fr-FR`;

        fetch(url, { method: 'GET', headers })
            .then(response => response.json())
            .then(data => {
                const results = data.results;

                results.forEach((actor, index) => {

                    if(actor.profile_path !== null){


                    const filmActor = actor.known_for;

                    //Création de la carte (card)
                    let card = document.createElement('div');
                    card.classList.add('card', 'm-3','card_actor');

                    //Création du corps de la carte (card-body)
                    const cardBody = document.createElement('div');
                    cardBody.classList.add('row', 'g-0');

                    cardBody.innerHTML = `<div class="col-md-4">
           <img src="${IMG_URL + actor.profile_path}" class="img-fluid rounded-start" alt="${IMG_URL + actor.original_name}">
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title">${actor.original_name}</h5>
             <h6 class="text-danger m-2">Film populaire</h6>
            <div class="d-flex flex-wrap justify-content-center text-white">
            ${filmActor.map(movie => `
            <div class="m-2"><img src="${IMG_URL +movie.poster_path}" style="max-width:6em;border:1px solid red"></div>`
            )}
            
            </div>
           </div>
         </div> `;

                    console.log(cardBody);
                    card.appendChild(cardBody);

                    block_actor.appendChild(card);


                    }}
                );


            })


    });
});



// <div class="m-2"><img src="${IMG_URL +movie.poster_path}" style="max-width:6em;border:1px solid red"></div>`



