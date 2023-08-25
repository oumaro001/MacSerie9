document.getElementById("year").textContent = new Date().getFullYear() + " Oumaro / MacSerie9";
let section_chaine = document.getElementById('section_chaine');

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjhmMWUxM2VjYTc5OWQxMmVmNmNjZWViZjVjNjQ5MyIsInN1YiI6IjY0ZTBlNTE0MzcxMDk3MDEzOTQ4ZTM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y_sZyDJi2cnH15uAdvP_VZDKBf0z9Kqa6zEqkh0PhfM';
const url = 'https://api.themoviedb.org/3/watch/providers/tv?language=fr-FR';

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
            card.classList.add('card','text-center', 'text-white', 'mb-3', 'bg-black', 'border-danger');
    
            // Création du corps de la carte (card-body)
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body','m-3');

            const texteSansEspace = chaine.provider_name.replace(/\s/g, '');
    
           cardBody.innerHTML = ` <div><a href="https://www.${texteSansEspace}.com/" target="_blank"><img src="${IMG_URL + chaine.logo_path}" alt="..." id="img_logo"></a>
                                <p class="text-white">${chaine.provider_name}</p></div>`;


           section_chaine.appendChild(cardBody)
        }
    );
    
  

})