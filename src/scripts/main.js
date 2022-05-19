import { ButtonsAndLollipop } from "./ButtonsAndLollipop.js";
import { fetchClowns, fetchCompletions, fetchRequests } from "./dataAccess.js";
// ^^ import functions ^^ //

// query selector -> main container //
const mainContainer = document.querySelector("#container");

// function -> render HTML to DOM //
const renderHTML = () => {
  fetchRequests()
    .then(() => fetchClowns())
    .then(() => fetchCompletions())
    .then(() => {
      mainContainer.innerHTML = ButtonsAndLollipop();
    });
};

renderHTML(); // function call //

// event listener -> state changed -> call renderHTML() //
mainContainer.addEventListener("stateChanged", (customEvent) => {
  renderHTML();
});
