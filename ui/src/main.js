import './style.css'
import { setupEventListeners } from './snow.js'


document.querySelector('#app').innerHTML = `
  <div>
    <h4>SNOW TX Demo!</h4>
    <div class="container">
      <div class="block">
        <p class="read-the-docs">
          Incident
        </p>
        <div class="card">
          <button id="newIncident" type="button">New Incident</button>
          <button id="closeIncident" type="button">Close Incident</button>
        </div>
      </div>
      <div class="block">
        <p class="read-the-docs">
          SNOW Search
        </p>
        <div class="card">
          <!--Drop down to select contact, case, account -->
          <select id="entity">
            <option value="customer_contact">Contact</option>
            <option value="sn_customerservice_case">Case</option>
            <option value="customer_account">Account</option>
          </select>
          <select id="type">
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
          </select>
          <select id="source">
            <option value="api">API</option>
            <option value="frame">Frame</option>
          </select>
          <input id="title" type="text" placeholder="Search" />
          <button id="search" type="button">Search</button>
          </br>
        </div>
      </div>
    </div>
    <div class="block">
        <p class="read-the-docs">
          New Items
        </p>
        <div class="card">
          
          <button id="newCase" type="button">New Case</button>
          <button id="newContact" type="button">New Contact</button>
          <!--<button id="btnSearch" type="button">Search Contact</button>
          <button id="openCase" type="button">Open Case</button> -->
        </div>
      </div>
          <div class="block">
        <p class="read-the-docs">
          API
        </p>
        <div class="card">
          
          <button id="btnGetCases" type="button">Get Cases</button>
          <button id="btnGetContacts" type="button">Get Contacts</button>
        </div>
        <!-- list to show the cases -->
        <div id="cases">
          <h3>Results</h3>
          <ul id="caseList">
          </ul>
        </div>

      </div>
  </div>
`

setupEventListeners(document)