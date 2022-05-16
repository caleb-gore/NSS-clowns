import { ButtonsAndLollipop } from "./ButtonsAndLollipop.js"
/* ^^ import functions from modules here ^^ */

/* assign main element to variable */
const mainContainer = document.querySelector('#container')

/* render HTML imported from modules into the DOM */
const renderHTML = () => {
    return mainContainer.innerHTML = ButtonsAndLollipop()
}

renderHTML()  // function call
