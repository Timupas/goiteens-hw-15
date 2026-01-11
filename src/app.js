import fetchCountries from "./fetchCountries";
import debounce from 'debounce';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});


const inputRef = document.querySelector(".data-input");
const listRef = document.querySelector(".list");
const contRef = document.querySelector(".sucess-box");

inputRef.addEventListener("input", debounce(searchCountry, 500))

function searchCountry(event) {
    const countryName = event.target.value.trim();
    listRef.innerHTML = ""
    contRef.innerHTML = ""
    fetchCountries(countryName).then(res => {
        if (res.length >= 10) {
            error({
                text: 'Зробіть запит більш специфічним!',
                delay: 1000,
            });
            return
        }
        if (res.length > 1 && res.length <= 10) {
            const country = res.map((item) => {
                return `<li class="item">${item.name.common}</li>`

            }).join("");
            listRef.innerHTML = country;
        }
        if (res.length === 1) {
            listRef.innerHTML = "";
            const countryInfo = res.map((item) => {
                const language = Object.values(item.languages);

                return contRef.innerHTML = `
                 <h1 class="title">${item.name.common}</h1>
      <div class="wrap">
        <div class="sucess-box">
          <h3 class="capital">Capital: ${item.capital}</h3>
          <p class="popular">population: ${item.population}</p>
          <h4 class="language">Languages</h4>
          <ul class="country-list"><li>${language}</li ></ul >
        </div >
            <img src="${item.flags.png}" alt="photo" class="country-img" />
      </div >
            `
            }).join("")
        }
    }).catch(error => console.log(error))

};
