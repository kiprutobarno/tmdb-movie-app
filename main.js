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
  movieEl.classList.add("movie");

  var imgEl = document.createElement("img");
  imgEl.src = `${IMGPATH}${path}`;
  imgEl.alt = `${title}`;

  classes.forEach((c) => {
    var div = document.createElement("div");
    div.className = c;
    switch (div.getAttribute("class")) {
      case "movie-info": {
        var subject = document.createElement("h3");
        subject.innerText = `${title}"`;
        var rating = document.createElement("span");
        rating.classList.add(`${getClassByRate(vote)}`);
        rating.innerText = `${vote}`;
        div.append(subject, rating);
        break;
      }

      case "overview": {
        var d = document.createElement("div");
        d.innerText = `${overview}`;
        div.appendChild(d);
        break;
      }
      default:
        break;
    }

    movieEl.append(imgEl, div);
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
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
