var data = '{}';
var page = 1;
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var xhr = new XMLHttpRequest();
var count = 0;
xhr.open('get', 'film.php?page=' + page);
xhr.send(data);
xhr.addEventListener('load', show, false);
next.addEventListener('click', mov, false);
prev.addEventListener('click', mov, false);
function mov() {
    this.id === 'next' ? page++ : page--;
    if (page < 1) {
        page = 1;
        return;
    }
    xhr.open('get', 'film.php?page=' + page);
    xhr.send(data);
    history.pushState(null, "", "page-" + page);
}
function show() {
    var response = JSON.parse(xhr.responseText);
    console.log(response);
    var mainDiv = document.getElementById('main');
    var rowDiv = Object();
    console.log(0 % 3);
    mainDiv.textContent = '';
    for (var _i = 0, _a = response.results; _i < _a.length; _i++) {
        var row = _a[_i];
        var film = addFilm(row);
        if (count % 2 === 0) {
            rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            rowDiv.appendChild(film);
        }
        else {
            rowDiv.appendChild(film);
            mainDiv.appendChild(rowDiv);
        }
        count++;
    }
}
function addFilm(response) {
    var film = document.createElement('div');
    var title = document.createElement('h3');
    var overview = document.createElement('p');
    var poster = document.createElement('img');
    poster.src = "https://image.tmdb.org/t/p/w500" + response.poster_path;
    poster.classList.add('img-fluid');
    title.textContent = response.title;
    overview.textContent = response.overview;
    film.classList.add('col-lg-6');
    film.appendChild(title);
    film.appendChild(overview);
    film.appendChild(poster);
    return film;
}
