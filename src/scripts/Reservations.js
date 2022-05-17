import { deleteRequest, getClowns, getRequests, saveCompletion } from "./dataAccess.js"

/* assign main element to variable */
const mainContainer = document.querySelector('#container')

export const Reservations = () => {
    const requests = getRequests()
    const clowns = getClowns()
    let html = `
    <div class="container">
    <h1>Reservations</h1>
    <ul class="list-group list-group-flush">
        ${requests.map((reservation) => {
        return `
        <li class="list-group-item">
            <div class="row">
            <div class="col-md-auto">
            ${reservation.parentName} reserved a ${reservation.length} hour appearance on ${reservation.date}
            </div>
            <div class="col-md-auto d-flex justify-content-end">
            <select class="clowns form-select" id="clowns">
                <option value="">Choose</option>
                ${
                    clowns.map(
                        (clown) => {
                            return `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
                        }
                    ).join("")
                }
            </select>
            </div>
            <div class="col d-flex justify-content-end">
            <button class="request_delete btn btn-danger" id="request--${reservation.id}">Deny</button>
            </div>
            </div>
        </li>`
        }).join("")}
</ul></div>`

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