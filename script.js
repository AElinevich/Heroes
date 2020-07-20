
'use strict';
const heroesContainer = document.querySelector('.heroes-container'),
      modal = document.querySelector('.modal'),
      heroeslist = document.querySelector('select'),
      header = document.querySelector('.header');

let arr = [];

const getReadyJson = cb => {
  const request = new XMLHttpRequest();
  request.open('GET', './dbHeroes.json');
  request.setRequestHeader('Content-Type', 'aplication/json');
  request.send();

request.addEventListener('readystatechange', () => {
  if (request.readyState !== 4) return;
  if (request.status === 200) {
      cb(JSON.parse(request.responseText));
  } else {
    new Error (request.statusText);
  }
  });
};

const protection = (fields, obj) => Object.keys(obj)
.filter(field => fields.includes(field))
.reduce((newObj, key) => {
  newObj[key] = obj[key];
        return newObj
}, {});

getReadyJson(data => {
  const newHeroes = data.map(item => protection(['name','status', 'photo', 'movies', 'realName'], item));

  function rendercard() {
  newHeroes.forEach((item)=>{
    const realName = item.realName ? item.realName : item.name,
          movies = item.movies ? item.movies : 'No information';
  
    const heroesList = document.createElement('li');
    heroesList.classList.add('hero-item');
    heroesList.innerHTML = `
      <div class="hero-card">
        <h4 class="hero-name__head">${item.name}</h4>
        <span class="movies-description">${movies}</span>
        <img class="hero-card__img"
          src="${item.photo}">
        <h4 class="hero__head">${realName}</h4>  
        <span class="hero__status">${item.status}</span>
      </div>

`;
    heroesContainer.append(heroesList);
    });  
};

rendercard();

header.addEventListener('click', () => {
  arr.length = 0;
  heroesContainer.textContent = "";
  rendercard();
}

);
function renderUniqueOption () {
  const movies = newHeroes.flatMap(hero => hero.movies);
  const uniqHeroes = new Set(movies);
  uniqHeroes.forEach((item)=> {
    if(item) {
      let option = new Option( `${item}`, `${item}`);
      heroeslist.append(option);
    }
  })
}

renderUniqueOption();

heroeslist.addEventListener('change', () =>{
  arr.length = 0 ;
  let selectedMovie = heroeslist.value;
newHeroes.filter(hero => {
  if(hero.movies) {
    let checkedMovies = hero.movies.includes(selectedMovie);
  if(checkedMovies) {
      arr.push(hero);
      heroesContainer.textContent = "";

      arr.forEach((item)=> {
      const realName = item.realName ? item.realName : item.name;
      const heroesList = document.createElement('li');

      heroesList.innerHTML = `
      <div class="hero-card">
      <h4 class="hero-name__head">${item.name}</h4>
      <img class="hero-card__img"
        src="${item.photo}">
      <h4 class="hero__head">${realName}</h4>  
      <span class="hero__status">${item.status}</span>
      </div>  
`;
         
  heroesContainer.append(heroesList);
  
  });
  };
  }; 
  });
}
);


    



        



  
    
  
  
 
  

        



  
   
 
  
 
  
})


