
let slider_carousel = document.querySelector('.carrousel');
let block_tv = document.getElementById('block_tv');
let film_populaire = document.getElementById('film_populaire');
let slide_track = document.getElementById('slide-track');




document.getElementById("year").textContent = new Date().getFullYear() + " Oumaro / MacSerie9";
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjhmMWUxM2VjYTc5OWQxMmVmNmNjZWViZjVjNjQ5MyIsInN1YiI6IjY0ZTBlNTE0MzcxMDk3MDEzOTQ4ZTM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y_sZyDJi2cnH15uAdvP_VZDKBf0z9Kqa6zEqkh0PhfM';


const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'accept': 'application/json'
};


/***************************************************** */
/********************** Carousel meilleur vote ******************************* */
/***************************************************** */

const carouselInner = document.querySelector('.carousel-inner');
const scrollContainer = document.getElementById('scrollContainer');
const content = document.querySelector('.content');

let isScrolling = false;
let startX, scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
    isScrolling = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('mouseleave', () => {
    isScrolling = false;
});

scrollContainer.addEventListener('mouseup', () => {
    isScrolling = false;
});

scrollContainer.addEventListener('mousemove', (e) => {
    if (!isScrolling) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 3; // Ajustez la valeur de multiplication pour un défilement plus rapide ou plus lent
    scrollContainer.scrollLeft = scrollLeft - walk;
});

/***************************************************** */

/**********************
 * 
 * **********  DATE EN FR ********************* */

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

/* **********  FILM POPULAIRE ********************* */
function filmPopulaire() {

    var angle = 0;
    function galleryspin(sign) {
        spinner = document.querySelector("#spinner");
        if (!sign) { angle = angle + 45; } else { angle = angle - 45; }
        spinner.setAttribute("style", "-webkit-transform: rotateY(" + angle + "deg); -moz-transform: rotateY(" + angle + "deg); transform: rotateY(" + angle + "deg);");
    }
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-US&page=1&sort_by=popularity.desc';

    fetch(url, { method: 'GET', headers })
        .then(response => response.json())
        .then(data => {
            // Le résultat de la requête est dans la variable data
            const results = data.results;

            // Parcours des données et affichage des identifiants (id) de chaque élément
            for (let i = 0; i < results.length; i++) {
                let date = dateFormatFr(results[i].release_date);


                let img = document.createElement('img');
                img.src = IMG_URL + results[i].poster_path;
                img.classList.add('img_populaire')


                film_populaire.appendChild(img);

            }


        })
        .catch(error => {
            console.error(error);
        });
}

/******************
 * ******************
 * ******************
 * 
 */

/* **********  FILM NOTE ********************* */

function filmNote() {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&vote_average.gte=8&vote_average.lte=10';
    fetch(url, { method: 'GET', headers })
        .then(response => response.json())
        .then(data => {
            // Le résultat de la requête est dans la variable data
            const results = data.results;

            results.forEach((film, index) => {

                if (film.poster_path !== null) {

                    let block_img = document.createElement('div');
                    block_img.classList.add('image-container');


                    const img = document.createElement('img');
                    img.classList.add('img_note');
                    img.src = IMG_URL + film.poster_path;


                    let block = document.createElement('div');
                    block.classList.add('description_film');
                    block.innerHTML = `
                                        <p>⭐️ ${film.vote_average}</p>`;


                    block_img.appendChild(block);
                    block_img.appendChild(img);
                    content.appendChild(block_img);


                };


            }


            )


        })

}

/* ******************
 * 
 */

/* **********  SERIE TV ********************* */
function getTvShow() {
    const url = "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=1&sort_by=popularity.desc&with_original_language=fr";
    fetch(url, { method: 'GET', headers })
        .then(response => response.json())
        .then(data => {

            const results = data.results;

            results.forEach((film, index) => {

                let date = dateFormatFr(film.first_air_date)

                if (film.poster_path !== null) {

                    let img = document.createElement('img');
                    img.src = IMG_URL + film.poster_path;
                    img.classList.add('img_populaire')

                    block_tv.appendChild(img);
                    //<p class="card-text d-flex flex-wrap">${film.overview}.</p>

                }
            })
        })

}


/* ******************
 * 
 */

/* ********** ACTEUR POPULAIRE ********************* */


function getActorDay() {  /*** affiche acteur de la semaine */

    const url = "https://api.themoviedb.org/3/trending/person/day?language=fr-FR";
    fetch(url, { method: 'GET', headers })
        .then(response => response.json())
        .then(data => {

            const results = data.results;

            results.forEach((actor, index) => {
                let slide = document.createElement('div');
                slide.classList.add('slide');

                
                // Assurez-vous que IMG_URL est défini correctement
                slide.innerHTML = `<img src="${IMG_URL + actor.profile_path}" height="100" width="250" alt="" />
                <p>${actor.name}</p> `;

                slide_track.append(slide);

            })
        })




}




//APPEL DES FONCTIONS

filmPopulaire();
filmNote()
getTvShow();
getActorDay();

/*

 <p style="font-weight:bold">${results[i].title}</p>
    <p>${date}</p>
    <p class="ml-2 bg-white p-sm-2">⭐️ ${results[i].vote_average}</p>


    ************************

       <img src="${IMG_URL + film.poster_path}" class="card-img" alt="...">
                      <div id="desc_card_tv">
                        <h5 class="card-title">${film.original_name}</h5>
                        <p >⭐️ ${film.vote_average}</p>
                        <p class="card-text"><small class="text-body-white">${date}</small></p>
                    </div>
*/