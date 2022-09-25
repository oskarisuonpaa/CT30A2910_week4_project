const searchBtn = document.querySelector("#submit-data");
const form = document.querySelector("form");

searchBtn.addEventListener("click", function () {
  const q = document.querySelector("#input-show").value;
  fetchData(q);
  form.reset();
});

async function fetchData(q) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === XMLHttpRequest.DONE) {
      const res = JSON.parse(xhttp.responseText);
      clearView();
      displayData(res);
    }
  };
  xhttp.open("GET", `https://api.tvmaze.com/search/shows?q=${q}`, true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.send();
}

function displayData(res) {
  for (let index = 0; index < res.length; index++) {
    const element = res[index].show;

    const dataContainer = document.createElement("div");
    dataContainer.className = "show-data";

    if (element.image !== null) {
      const img = document.createElement("img");
      img.src = element.image.medium;
      dataContainer.appendChild(img);
    }

    const infoContainer = document.createElement("div");
    infoContainer.className = "show-info";

    const title = document.createElement("h1");
    title.innerHTML = element.name;
    infoContainer.appendChild(title);

    infoContainer.insertAdjacentHTML("beforeend", element.summary);

    dataContainer.appendChild(infoContainer);

    document.body.appendChild(dataContainer);
  }
}

function clearView() {
  const shows = document.querySelectorAll(".show-data");

  shows.forEach((show) => {
    show.remove();
  });
}

console.log("Hello");
