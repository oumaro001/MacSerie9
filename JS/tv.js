document.getElementById("year").textContent = new Date().getFullYear() + " Oumaro / MacSerie9";
let block_Tv = document.getElementById('block_TV');
let nameSearch;


const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjhmMWUxM2VjYTc5OWQxMmVmNmNjZWViZjVjNjQ5MyIsInN1YiI6IjY0ZTBlNTE0MzcxMDk3MDEzOTQ4ZTM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y_sZyDJi2cnH15uAdvP_VZDKBf0z9Kqa6zEqkh0PhfM';

const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'accept': 'application/json'
};

function dateFormatFr(date) { //convertit les dates en date française

    let dateString = date;
    let dateParts = dateString.split("-");
    let year = dateParts[0];
    let month = dateParts[1];
    let day = dateParts[2];

    // Tableaux des noms des mois en français
    const moisEnFrancais = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    let dateFrancaise = `${day} ${moisEnFrancais[month - 1]} ${year}`;


    return dateFrancaise;
}


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("searchForm");

    form.addEventListener("submit", function (event) {

        block_Tv.innerHTML = " ";
        event.preventDefault(); // Empêche la soumission du formulaire par défaut

        // Récupérer les valeurs des champs
        nameSearch = document.getElementById("search").value;

        const url = `https://api.themoviedb.org/3/search/tv?query=${nameSearch}&include_adult=false&language=fr-FR`;

        fetch(url, { method: 'GET', headers })
            .then(response => response.json())
            .then(data => {
                const results = data.results;


                results.forEach((tv, index) => {

                    if (tv.poster_path !== null) {

                        let date = dateFormatFr(tv.first_air_date);

                        //Création de la carte (card)
                        let card = document.createElement('div');
                        card.classList.add('card', 'm-5', 'card_film');

                        //Création du corps de la carte (card-body)
                        const cardBody = document.createElement('div');
                        cardBody.classList.add('row', 'g-0');

                        cardBody.innerHTML = `<div class="col-md-4" id="img_card">
           <img src="${IMG_URL + tv.poster_path}" class="img-fluid rounded-start" alt="${tv.original_name}">
         </div>
         <div class="col-md-8">
           <div class="card-body">
           <h5 class="card-title">${tv.original_name}</h5>  
            <p class="text-danger m-2">${date}</p>
            <p class="ml-2 bg-white p-sm-2">⭐️ ${tv.vote_average}</p>
            <p>${tv.overview}</p>

           </div>
         </div> `;

                        console.log(cardBody);
                        card.appendChild(cardBody);

                        block_Tv.appendChild(card);


                    }
                }
                );




            })
    })
})        