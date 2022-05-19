import {
  deleteRequest,
  getClowns,
  getCompletions,
  getRequests,
  saveCompletion,
} from "./dataAccess.js";
// ^^ import functions ^^ //

// query selector -> main container //
const mainContainer = document.querySelector("#container");

/* <===> <===> FUNCTIONS <===> <===> */

// --- build Reservations HTML -> exported to ButtonsAndLollipop.js --- //
export const Reservations = () => {
  const requests = sortReservations();
  const clowns = getClowns();
  let html = `
    <div class="container">
    <h1>Reservations</h1>
    <ul class="list-group list-group-flush">
        ${requests
          .map((reservation) => {
            return clownSelect(clowns, reservation);
          })
          .join("")}
</ul></div>`;

  return html;
};

// --- builds clown select dropdown & deny buttons -> based on reservation completion --- //
const clownSelect = (clownsArr, reservationObj) => {
  if (reservationObj.isCompleted === false) {
    return `<li class="list-group-item">
        <div class="row">
        <div class="col-9">
        ${reservationObj.parentName} reserved a ${
      reservationObj.length
    } hour appearance on ${reservationObj.date}
        </div><div class="col">
        <select class="clowns form-select" id="clowns">
                <option value="">Choose</option>
                ${clownsArr
                  .map((clown) => {
                    return `<option value="${reservationObj.id}--${clown.id}">${clown.name}</option>`;
                  })
                  .join("")}
            </select>
            </div>
            <div class="col">
            <button class="request_delete btn btn-danger" id="request--${
              reservationObj.id
            }">Deny</button>
            </div>
            </li>`;
  } else {
    const completions = getCompletions();
    const completedReservation = completions.find(
      (completion) => reservationObj.id === completion.reservationId
    );
    const gigClown = clownsArr.find(
      (clown) => completedReservation.clownId === clown.id
    );

    return `<li style="background: #d3ffd8" class="list-group-item">
            <div class="row">
            <div class="col-9">
            ${reservationObj.parentName} reserved a ${reservationObj.length} hour appearance on ${reservationObj.date}
            </div><div class="col">
            <p>
            completed by ${gigClown.name}
            </p>

            </div>
            </div>`;
  }
};

// --- sorts reservations by completion state -> returns sorted array --- //
const sortReservations = () => {
  const reservations = getRequests();
  const completions = getCompletions();

  reservations.forEach((reservation) => {
    const completedReservation = completions.find(
      (completion) => completion.reservationId === reservation.id
    );
    if (completedReservation) {
      reservation.isCompleted = true;
    } else {
      reservation.isCompleted = false;
    }
    console.log(reservation);
  });

  reservations.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

  return reservations;
};
/* END */

/* <===> <===> EVENT LISTENERS <===> <===> */

// --- deny button -> deletes reservation --- //
mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id.startsWith("request")) {
    const [, requestId] = clickEvent.target.id.split("--");

    deleteRequest(parseInt(requestId));
  }
});

// --- clown selection -> choses clown to complete reservation --- //
mainContainer.addEventListener("change", (event) => {
  if (event.target.id === "clowns") {
    const [reservationId, clownId] = event.target.value.split("--");

    const completion = {
      reservationId: parseInt(reservationId),
      clownId: parseInt(clownId),
      date_created: Date.now(),
    };

    saveCompletion(completion);
  }
});
/* END */
