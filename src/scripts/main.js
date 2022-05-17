import { ButtonsAndLollipop } from "./ButtonsAndLollipop.js"
import { fetchClowns, fetchCompletions, fetchRequests } from "./dataAccess.js"
/* ^^ import functions from modules here ^^ */

/* assign main element to variable */
const mainContainer = document.querySelector('#container')

/* render HTML imported from modules into the DOM */
const renderHTML = () => {
    fetchRequests()
        .then(() => fetchClowns())
        .then(() => fetchCompletions())
        .then(
            () => {
                mainContainer.innerHTML = ButtonsAndLollipop()
            }
        )
}

renderHTML()  // function call

mainContainer.addEventListener(
    "stateChanged", 
    customEvent => {
        renderHTML()
    }
)