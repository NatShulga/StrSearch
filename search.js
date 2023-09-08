const api = `https://raw.githubusercontent.com/NatShulga/Product-shop.json/main/Product%20shop.json`;

const stations = [];

fetch(api)
  .then((res) => res.json())
  .then((data) => {
    console.log("data >>>>", data);

    data.forEach((line) => {
      stations.push(...line.stations);
    });
  });

function getOptions(word, stations) {
  return stations.filter((s) => {
    //определить совпадает ли то что мы вбили в inpute
    //по названиям внутри массива

    const regex = new RegExp(word, "gi"); //g - флаг, ищет совпадения в строке.

    return s.name.match(regex); // i флаг, включает режим игнорирования регистра
  });
}

function displayOptions() {
  console.log("this.value >> ", this.value);

  const options = getOptions(this.value, stations);

  const html = options
    .map((station) => {
      const regex = new RegExp(this.value, "gi");
      const ProductnName = station.name.replace(
        regex,
        ` <innerText class="h1">${this.value}</innerText>`
      );

      return `<li>${ProductnName}</li>`;
    })
    .slice(0, 10)
    .join("");

  searchOptions.innerHTML = this.value ? html : null;
}

const searchInput = document.querySelector(".search");
const searchOptions = document.querySelector(".options");

searchInput.addEventListener("change", displayOptions);
searchInput.addEventListener("keyup", displayOptions);
