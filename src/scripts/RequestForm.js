import { sendRequest } from "./dataAccess.js"


/* build HTML for request form */
export const RequestForm = () => {
    return ` 
        <form class="container">
            <div class="field mb-3">
                <label class="form-label" for="parentName">Parent's Name</label>
                <input type="text" name="parentName" class="input form-control" />
            </div>
            <div class="field mb-3">
                <label class="form-label" for="childName">Child's Name</label>
                <input type="text" name="childName" class="input form-control" />
            </div>
            <div class="field mb-3">
                <label class="form-label" for="numOfChildren">Number of Children in Attendance</label>
                <input type="number" name="numOfChildren" class="input form-control" />
            </div>
            <div class="field mb-3">
                <label class="form-label" for="address">Address</label>
                <input type="text" name="address" class="input form-control" />
            </div>
            <div class="field mb-3">
                <label class="form-label" for="date">Date of Party</label>
                <input type="date" name="date" class="input form-control" />
            </div>
            <div class="field mb-3">
                <label class="form-label" for="length">Number of Hours</label>
                <input type="number" name="length" class="input form-control" />
            </div>
            
            <button class="button btn btn-primary" id="submitRequest">Submit Request</button>
        </form>`
}

/* assign main element to variable */
const mainContainer = document.querySelector('#container')

mainContainer.addEventListener(
    'click',
    clickEvent => {
        if (clickEvent.target.id === "submitRequest") {
            const userParentName = document.querySelector("input[name='parentName']").value
            const userChildName = document.querySelector("input[name='childName']").value
            const userNumOfChildren = document.querySelector("input[name='numOfChildren']").value
            const userAddress = document.querySelector("input[name='address']").value
            const userDate = document.querySelector("input[name='date']").value
            const userLength = document.querySelector("input[name='length']").value

            const dataToSendToAPI = {
                parentName: userParentName,
                childName: userChildName,
                numOfChildren: userNumOfChildren,
                address: userAddress,
                date: userDate,
                length: userLength
            }

            sendRequest(dataToSendToAPI)

        }
    }
)