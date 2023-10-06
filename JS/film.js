document.getElementById("year").textContent = new Date().getFullYear() + " Oumaro / MacSerie9";
let block_film = document.getElementById('block_film');
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

        block_film.innerHTML = " ";
        event.preventDefault(); // Empêche la soumission du formulaire par défaut

        // Récupérer les valeurs des champs
        nameSearch = document.getElementById("search").value;

        const url = `https://api.themoviedb.org/3/search/movie?query=${nameSearch}&include_adult=false&language=fr-FR`;

        fetch(url, { method: 'GET', headers })
            .then(response => response.json())
            .then(data => {
                const results = data.results;

                if (results.length == 0) {

                    let p_error = document.createElement('div');
                    p_error.classList.add('align-center', 'm-5');

                    p_error.innerHTML = `<h2 class="text-white text-center">Aucun resultat 🤷🏻‍♂️</h2>
                                        <img src="./images/not-found.gif">`

                    block_film.append(p_error)

                }

                results.forEach((film, index) => {

                    if (film.poster_path !== null) {

                        let img = document.createElement('div');
                        img.classList.add('film_img');

                        img.innerHTML = `<a href="film_id.html?id=${film.id}&name=${film.original_title}"><img src ="${IMG_URL + film.poster_path}"></a>`


                        block_film.appendChild(img);


                    }
                }
                );




            })



    })
})        
