import { deleteRequest, getClowns, getRequests, saveCompletion } from "./dataAccess.js"

/* assign main element to variable */
const mainContainer = document.querySelector('#container')

export const Reservations = () => {
    const requests = getRequests()
    const clowns = getClowns()
    let html = `<h1>Reservations</h1>
    <ul>
        ${requests.map((reservation) => {
        return `
        <li>
            ${reservation.parentName} reserved a ${reservation.length} hour appearance on ${reservation.date}
            
            <select class="clowns" id="clowns">
                <option value="">Choose</option>
                ${
                    clowns.map(
                        (clown) => {
                            return `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
                        }
                    ).join("")
                }
            </select>

            <button class="request_delete" id="request--${reservation.id}">Deny</button>

        </li>`
        }).join("")}
</ul>`

    return html
}

mainContainer.addEventListener('click', clickEvent => {
    if (clickEvent.target.id.startsWith('request')) {
        const [, requestId] = clickEvent.target.id.split('--')

        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [reservationId, clownId] = event.target.value.split("--")

            const completion = {
                reservationId: parseInt(reservationId),
                clownId: parseInt(clownId),
                date_created: Date.now()
            }

            saveCompletion(completion)
        }
    }
)