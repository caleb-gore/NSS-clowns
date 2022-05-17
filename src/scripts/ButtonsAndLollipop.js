import { RequestForm } from "./RequestForm.js"
import { Reservations } from "./Reservations.js"
/* ^^ import functions from modules here ^^ */

/* build HTML using functions imported from other modules */
export const ButtonsAndLollipop = () => {
    return `
    ${RequestForm()}
    ${Reservations()}
        `
}