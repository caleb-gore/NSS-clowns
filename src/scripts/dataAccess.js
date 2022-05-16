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

