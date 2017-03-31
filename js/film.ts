let data = '{}'
let page = 1;
let next = document.getElementById('next')
let prev = document.getElementById('prev')
let xhr = new XMLHttpRequest()
let count = 0;

xhr.open('get', 'film.php?page=' + page)
xhr.send(data)

xhr.addEventListener('load', show, false)
next.addEventListener('click', mov, false)
prev.addEventListener('click', mov, false)

function mov () {
 
  this.id === 'next' ? page++ : page--
   if (page < 1) {
     page = 1;
     return;
  }
  xhr.open('get', 'film.php?page=' + page)
  xhr.send(data);

  history.pushState(null, "", "page-" + page);  
}

function show () {
  let response = JSON.parse(xhr.responseText)
  let mainDiv = document.getElementById('main')
  let rowDiv = Object()
  console.log(0 % 3);
  mainDiv.textContent = ''
  for (let row of response.results) {
  	let film = addFilm(row)
    if (count % 2 === 0) {
      rowDiv = document.createElement('div')
      rowDiv.classList.add('row')
      rowDiv.appendChild(film)
    } else {
      rowDiv.appendChild(film)
      mainDiv.appendChild(rowDiv)
    }
    count++;
  }
}

function addFilm (response) {
  let film = document.createElement('div')
  let title = document.createElement('h3')
  let overview = document.createElement('p')
  let poster = document.createElement('img')
  poster.src = "https://image.tmdb.org/t/p/w500" + response.poster_path
  poster.classList.add('img-fluid')
  title.textContent = response.title
  overview.textContent = response.overview
  film.classList.add('col-lg-6')
  film.appendChild(title)
  film.appendChild(overview)
  film.appendChild(poster)
  return film
}