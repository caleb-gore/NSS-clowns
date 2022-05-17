const applicationState = {
    requests: [],
    clowns: []
}

/*  assign API to a variable */
const API = "http://localhost:8088"

/* assign main element to variable */
const mainContainer = document.querySelector('#container')

export const sendRequest = (userRequest) => {
    const fetchOptions = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(res => res.json())
        .then (() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
export const saveCompletion = (completion) => {
    const fetchOptions = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(res => res.json())
        .then (() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
        (reservations) => {
            applicationState.requests = reservations
        }
    )
}

export const getRequests = () => {
    return applicationState.requests.map(reservation => ({ ...reservation }))
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (clowns) => {
                applicationState.clowns = clowns
            }
        )
}

export const getClowns =() => {
    return applicationState.clowns.map(clown => ({...clown}))
}