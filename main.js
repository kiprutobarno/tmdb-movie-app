const APIURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=20b76c1b0a1faa8c062ac539db75368a";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?api_key=20b76c1b0a1faa8c062ac539db75368a&query=";

const main = document.getElementById("content");

const form = document.getElementById("form");

const search = document.getElementById("search");

getMovies(APIURL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function createContentComponent(path, title, vote, overview) {
  var classes = ["movie-info", "overview"];

  var movieEl = document.createElement("div");
  var overviewEl = document.createElement("div");
  var ratingEl = document.createElement("span");
  var titleEl = document.createElement("h3");
  var movieInfoEl = document.createElement("div");

  movieEl.classList.add("movie");

  var imgEl = document.createElement("img");
  imgEl.src = `${IMGPATH}${path}`;
  imgEl.alt = `${title}`;

  classes.forEach((c) => {
    movieInfoEl.className = c;

    if (movieInfoEl.getAttribute("class") === "movie-info") {
      titleEl.innerText = `${title}"`;
      ratingEl.classList.add(`${getClassByRate(vote)}`);
      ratingEl.innerText = `${vote}`;
      movieInfoEl.append(titleEl, ratingEl);
    } else {
      overviewEl.innerText = `${overview}`;
      movieInfoEl.appendChild(overviewEl);
    }

    movieEl.append(imgEl, movieInfoEl);
    
  });

  main.append(movieEl);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, overview, vote_average } = movie;
    createContentComponent(poster_path, title, vote_average, overview);
  });
}

function getClassByRate(vote) {
  return vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
