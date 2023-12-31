document.getElementById("year").textContent = new Date().getFullYear() + " Oumaro / MacSerie9";
let section_chaine = document.getElementById('section_chaine');

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjhmMWUxM2VjYTc5OWQxMmVmNmNjZWViZjVjNjQ5MyIsInN1YiI6IjY0ZTBlNTE0MzcxMDk3MDEzOTQ4ZTM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y_sZyDJi2cnH15uAdvP_VZDKBf0z9Kqa6zEqkh0PhfM';
const url = 'https://api.themoviedb.org/3/watch/providers/tv?language=fr-FR&watch_region=fr';

const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'accept': 'application/json'
};

fetch(url, { method: 'GET', headers })
.then(response => response.json())
.then(data => { 
    const results = data.results;

   results.forEach((chaine, index) => {
    

        
            // Création de la carte (card)
            let card = document.createElement('div');
            card.classList.add('col','m-3');
    
            // Création du corps de la carte (card-body)
            const cardBody = document.createElement('div');
            cardBody.classList.add('card','bg-white');
            ///cardBody.style = 'margin:0% 23%; width:100%'

            const texteSansEspace = chaine.provider_name.replace(/\s/g, '');
    
           cardBody.innerHTML = ` <div class="card-body"><img src="${IMG_URL + chaine.logo_path}" alt="..." id="img_logo">
                                <p class="text-dark">${chaine.provider_name}</p></div>`;


           section_chaine.appendChild(cardBody)
        }
    );
    
  

})