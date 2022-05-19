import { RequestForm } from "./RequestForm.js";
import { Reservations } from "./Reservations.js";
// ^^ import functions ^^ //

// function -> build HTML for page -> exported to main.js //
export const ButtonsAndLollipop = () => {
  return `
    
    <h1 class="text-center">Buttons and Lollipop</h1>
    <h3 class="text-center">clowns for hire</h3>
    
    ${RequestForm()}
    ${Reservations()}
        `;
};
