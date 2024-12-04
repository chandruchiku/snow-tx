import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
// https://dev225949.service-now.com/scripts/openframe/1.0.5/openFrameAPI.js
import { setupEventListeners } from './snow.js'


document.querySelector('#app').innerHTML = `
  <div>
    <!--<a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a> -->
    <h4>SNOW TX Demo!</h4>
    <div class="container" style="">
      <div class="block">
        <p class="read-the-docs">
          Interaction Events
        </p>
        <div class="card">
          <button id="newInteraction" type="button">New Interaction</button>
          <button id="closeInteraction" type="button">Close Interaction</button>
        </div>
      </div>
      <div class="block">
        <p class="read-the-docs">
          SNOW Methods
        </p>
        <div class="card">
          <input id="title" type="text" placeholder="Search" />
          <button id="search" type="button">Search</button>
          <button id="newCase" type="button">New Case</button>
          <button id="updateCase" type="button">Update Case</button>
          <button id="openContact" type="button">Open Contact</button>
          <button id="openCase" type="button">Open Case</button>
        </div>
      </div>
    </div>
  </div>
`

setupEventListeners(document)
