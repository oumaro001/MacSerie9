
let acceuil_block = document.getElementById('acceuil_block');
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

document.getElementById("year").textContent = new Date().getFullYear() + " Oumaro / MacSerie9";
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
function filmPopulaire() {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-US&page=1&sort_by=popularity.desc';

    fetch(url, { method: 'GET', headers })
        .then(response => response.json())
        .then(data => {
            // Le résultat de la requête est dans la variable data
            const results = data.results;

            // Parcours des données et affichage des identifiants (id) de chaque élément
            for (let i = 0; i < results.length; i++) {

                let date = dateFormatFr(results[i].release_date)

                let card = document.createElement('div');
                card.classList.add('card');

                card.innerHTML = `
          <img src="${IMG_URL + results[i].poster_path}" class="card-img-top" alt="...">    
          <div class="card-body" style="background-color: rgb(214, 214, 214) !important">
            <p class="card-text" style="font-weight:bold">${results[i].title}</p>
            <p>${date}</p>
            <p class="ml-2 bg-white p-sm-2">⭐️ ${results[i].vote_average}</p>
          </div>
        </div> `

                acceuil_block.append(card)
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

function filmNote() {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&vote_average.gte=8&vote_average.lte=10';
    fetch(url, { method: 'GET', headers })
        .then(response => response.json())
        .then(data => {
            // Le résultat de la requête est dans la variable data
            const results = data.results;

            results.forEach((film, index) => {

             /*   if (film.poster_path !== null) {

                    const item = document.createElement('div');
                    item.classList.add('carousel-item');
                    if (index === 0) {
                        item.classList.add('active');
                    }

                    const img = document.createElement('img');
                    img.src = IMG_URL + film.poster_path;
                    img.classList.add('d-block', 'w-100');

                    let block = document.createElement('div');
                    block.classList.add('description_film');
                    block.innerHTML = `<p>${film.original_title}</p>
                                        <p>${film.vote_average}`;


                    item.appendChild(img);
                    item.appendChild(block);
                    carouselInner.appendChild(item);


                }; */
                
                
                if (film.poster_path !== null) {

                    let block_img = document.createElement('div');
                     block_img.classList.add('image-container');


                    const img = document.createElement('img');
                    img.src = IMG_URL + film.poster_path;
                   // img.classList.add('d-block', 'w-100');

                    let block = document.createElement('div');
                    block.classList.add('description_film');
                    block.innerHTML = `<p>${film.original_title}</p>
                                        <p>⭐️ ${film.vote_average}</p>`;


                                        block_img.appendChild(block);
                                       block_img.appendChild(img);

                                       // img.appendChild(block)
                                        //content.appendChild(img);
                                        //content.appendChild(block)
                                        content.appendChild(block_img);


                };


            }


            )


        })

}



//APPEL DES FONCTIONS

filmPopulaire();
filmNote()