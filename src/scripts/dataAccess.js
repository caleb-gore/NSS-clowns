// application state //
const applicationState = {
  requests: [],
  clowns: [],
};

// get API //
const API = "http://localhost:8088";

// query selector (main container) //
const mainContainer = document.querySelector("#container");

/* <===> <===> FUNCTIONS (FETCH) <===> <===> */

// --- fetch requests from API -> exported --- //
export const fetchRequests = () => {
  return fetch(`${API}/requests`)
    .then((response) => response.json())
    .then((reservations) => {
      applicationState.requests = reservations;
    });
};

// --- fetch clowns from API -> exported --- //
export const fetchClowns = () => {
  return fetch(`${API}/clowns`)
    .then((response) => response.json())
    .then((clowns) => {
      applicationState.clowns = clowns;
    });
};

// --- fetch completions from API -> exported --- //
export const fetchCompletions = () => {
  return fetch(`${API}/completions`)
    .then((response) => response.json())
    .then((completions) => {
      applicationState.completions = completions;
    });
};
/* END */

/* <===> <===> FUNCTIONS (SEND/POST) <===> <===> */

// --- send request to API -> exported --- //
export const sendRequest = (userRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userRequest),
  };

  return fetch(`${API}/requests`, fetchOptions)
    .then((res) => res.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

// --- send completion to API -> exported --- //
export const saveCompletion = (completion) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completion),
  };

  return fetch(`${API}/completions`, fetchOptions)
    .then((res) => res.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};
/* END */

/* <===> <===> FUNCTIONS (GET) <===> <===> */

// --- get requests from application state -> exported --- //
export const getRequests = () => {
  return applicationState.requests.map((reservation) => ({ ...reservation }));
};

// --- get clowns from application state -> exported --- //
export const getClowns = () => {
  return applicationState.clowns.map((clown) => ({ ...clown }));
};
// --- get completions from API -> exported --- //
export const getCompletions = () => {
  return applicationState.completions.map((completion) => ({ ...completion }));
};
/* END */

/* <===> <===> FUNCTIONS (DELETE) <===> <===> */

// --- delete request from API -> exported --- //
export const deleteRequest = (id) => {
  return fetch(`${API}/requests/${id}`, { method: "DELETE" }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};
/* END */
