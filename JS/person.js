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

                if (results.length == 0) {

                    let p_error = document.createElement('div');
                    p_error.classList.add('align-center', 'm-5');

                    p_error.innerHTML = `<h2 class="text-white text-center">Aucun resultat 🤷🏻‍♂️</h2>
                                        <img src="./images/not-found.gif">`

                     block_actor.append(p_error)

                }

                results.forEach((actor, index) => {

                    if(actor.profile_path !== null){

                        let img = document.createElement('div');
                        img.classList.add('film_img');

                        img.innerHTML = `<a href="actor_id.html?id=${actor.id}&name=${actor.name}"><img src ="${IMG_URL + actor.profile_path}"></a>
                                        <p class="text-white text-center">${actor.name}</p>`

                

                    block_actor.appendChild(img);


                    }}
                );


            })


    });
});



// <div class="m-2"><img src="${IMG_URL +movie.poster_path}" style="max-width:6em;border:1px solid red"></div>`



