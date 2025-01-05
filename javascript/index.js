import {RegisterRecord} from "./register.js";

// Buttons
const createRegButton = document.getElementById('create-register-button');
const deleteRegButton = document.getElementById('delete-register-button');
const clearButton = document.getElementById('clear-register-container');
const searchButton = document.getElementById('search-button');
const getAllButton = document.getElementById('get-all-registers-button');

// Register detail form
const addressForm = document.getElementById('address-form');
const labelForm = document.getElementById('label-form');
const dataTypeSelect = document.getElementById('data_type-select');
const factorForm = document.getElementById('factor-form');
const unitSelect = document.getElementById('unit-select');
const descriptionForm = document.getElementById('description-form');
const dataForm = document.getElementById('data-form');

// Register search filters
const addressSearch = document.getElementById('address-filter');
const labelSearch = document.getElementById('label-filter');
const dataTypeSearch = document.getElementById("data_type-filter");
const factorSearch = document.getElementById('factor-filter');
const unitSearch = document.getElementById('unit-filter');

// Table
const registerTable = document.getElementById('register-table');

const API_URL = {
    ALL: "http://localhost:8081/api/v1/registers",
    BY_ID: (id) => `http://localhost:8081/api/v1/registers/${id}`,
    BY_LABEL: (label) => `http://localhost:8081/api/v1/registers/label/${label}`,
    BY_ADDRESS: (address) => `http://localhost:8081/api/v1/registers/address/${address}`,
    BY_DATA_TYPE: (dataType) => `http://localhost:8081/api/v1/registers/data-type/${dataType}`,
    BY_FACTOR: (factor) => `http://localhost:8081/api/v1/registers/factor/${factor}`,
    BY_UNIT: (unit) => `http://localhost:8081/api/v1/registers/unit/${unit}`
};


/*
    fetch data from database API 
    @return data in JSON format
*/
export async function fetchApiData(url) {
    try {
        let response = await fetch(url); // wait for fetch to complete
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        console.log(`Response from fetch: ${response}`);
        let dataJson = await response.json() // wait for JSON conversion to complete
        console.log(`Fetched data ${dataJson}`);

        // return response json data
        return dataJson;
    } catch (error) {
        console.log(error.message);
    }
}

/*
    post data to database using database API
*/
async function postApiData(url, register) {
    console.log("POSTing data");
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Inform the server that the request body is JSON
            },
            body: register.toJson()
        });
        
        // check response -> throw error if not OK
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`); 
        }

        // return response data
        return await response.json();
    }
    catch (error) {
        console.log(error.message);
    }
}

/*
    Delete data from database using database API
 */
async function deleteApiData(url) {
    console.log("DELETing data");
    try {
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Inform the server that the request body is JSON
            }
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        console.log("DELETED");

        return response;
    } catch (error) {
        console.log(error.message);
    }
}

/*
    Update register in database
*/
async function updateApiData(url, register) {
    console.log("UPDATing data");
    try {
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: register.toJson()
        });

        if (!response.ok) {
            new Error(`Response status: ${response.status}`);
        }



    } catch (error) {
        console.log(error.message);
    }
}


/*
    display list of registers in table
*/
function addRegistersToTable(registers) {
    let placeholder = document.querySelector("#register_output");
    let registerRowOutput = "";

    for (const register of registers) {
        registerRowOutput += `
            <tr>
                <td>${register.address}</td>
                <td>${register.label}</td>
                <td>${register.dataType}</td>
                <td>${register.factor}</td>
                <td>${register.unit}</td>
                <td>${register.data}</td>
            </tr>
        `;            
        
    }

    // populate registers table with all registers
    placeholder.innerHTML = registerRowOutput;
}

/*
    display single register in table
*/
function addRegisterToTable(register) {
    let placeholder = document.querySelector("#register_output");
    let registerRowOutput = `<tr>
            <td>${register.address}</td>
            <td>${register.label}</td>
            <td>${register.dataType}</td>
            <td>${register.factor}</td>
            <td>${register.unit}</td>
            <td>${register.data}</td>
        </tr>`; 

    // populate registers table with all registers
    placeholder.innerHTML = registerRowOutput;
}

/*
    display single register in form
*/
function addRegisterToForm(register) {
    addressForm.value = register.address;
    labelForm.value = register.label;
    dataTypeSelect.value = register.dataType;
    factorForm.value = register.factor;
    unitSelect.value = register.unit;
    descriptionForm.value = register.description;
    dataForm.value = register.data;
}

/*
    Reset all form fields
    using after creating register
*/
function clearRegisterForm() {
    addressForm.value = "";
    labelForm.value = "";
    dataTypeSelect.value = "-";
    factorForm.value = "";
    unitSelect.value = "-";
    descriptionForm.value = "";
    dataForm.value = "";
}

/*
    Table listener
    -> click on table rows
*/
registerTable.addEventListener('click', async function (event) {
    // check if event is triggered by table row
    if (event.target.closest("tr")) {
        const clickedRow = event.target.closest("tr");
        const address = clickedRow.children[0].innerText;
        console.log(`Clicked: ${address}`);

        // get register that has been clicked by the address (the row element doesn't have all register attributes -> need to fetch from database)
        const registerJson = await fetchApiData(API_URL.BY_ADDRESS(address));
        const registerClicked = RegisterRecord.fromJson(registerJson);

        addRegisterToForm(registerClicked);
    }

});

/*
    SUBMIT button
    -> should CREATE new record in database
    TODO: put together all buttons
*/
if (createRegButton) {
    createRegButton.addEventListener('click', async () => {
        console.log("clicked");
        // Need to check that all required attributes exists
        if (addressForm.value.trim() === "" || labelForm.value.trim() === "") {
            alert("Register address or label can't be empty!");
            return;
        }

        const address = addressForm.value.trim();
        const label = labelForm.value.trim();
        const dataType = dataTypeSelect.value;
        const factor = factorForm.value.trim();
        const unit = unitSelect.value;
        const description = descriptionForm.value.trim();
        const data = dataForm.value.trim();

        // create RegisterRecord instance with values from individual register container
        const record = new RegisterRecord(address, label, dataType, factor, unit, description, data);
        
        const response = await postApiData(API_URL.ALL, record);
        console.log(`POST register: ${response}`);
        clearRegisterForm();

    });
}

/*
    DELETE button
    -> deletes selected register that is currently in the register container

    to delete a register only address is needed
    TODO: maybe think of better way
 */
if (deleteRegButton) {
    deleteRegButton.addEventListener('click', async () => {
        // check if there is a register in Individual reg container (is there address value)
        if (!addressForm.value) {
            alert("Need address to delete register.");
            return;
        }

        const address = addressForm.value.trim();
        console.log(address);

        const response = await deleteApiData(API_URL.BY_ADDRESS(address));
        console.log(`DELETE register: ${response}`);
        clearRegisterForm();
    });
}

/*
    CLEAR button
    -> clears register form
 */
clearButton.addEventListener('click', () => {
    clearRegisterForm();
});

/*
    SEARCH button
    -> search by all attributes of register record

    // TODO: doesn't support search by more attributes
 */
if (searchButton) {
    searchButton.addEventListener('click', async () => {
        let register = null;
        let registerList = null;

        // check what we search for
        if (addressSearch.value) { // ADDRESS
            const address = addressSearch.value.trim();

            const apiData = await fetchApiData(API_URL.BY_ADDRESS(address));
            register = RegisterRecord.fromJson(apiData);
        }
        else if (labelSearch.value) { // LABEL
            const label = labelSearch.value

            const apiData = await fetchApiData(API_URL.BY_LABEL(label));
            register = RegisterRecord.fromJson(apiData)
        }
        else if (dataTypeSearch.value !== '-') { // DATA TYPE -> data-type select has been changed if it is not '-'
            const dataType = dataTypeSearch.value;

            const apiData = await fetchApiData(API_URL.BY_DATA_TYPE(dataType));
            registerList = apiData.map(register => RegisterRecord.fromJson(register));
        }
        else if (factorSearch.value) { // FACTOR
            const factor = factorSearch.value;

            const apiData = await fetchApiData(API_URL.BY_FACTOR(factor));
            registerList = apiData.map(register => RegisterRecord.fromJson(register));
        } else if (unitSearch.value !== '-') { // UNIT
            const unit = unitSearch.value;

            const apiData = await fetchApiData(API_URL.BY_UNIT(unit));
            registerList = apiData.map(register => RegisterRecord.fromJson(register));
        }

        if (!register || !registerList) {
            console.error("SEARCH went wrong :(");
        }

        // determine if we have list or single RegisterRecord object
        if (registerList) { // list of registers
            addRegistersToTable(registerList);
        } else if (register) { // single register
            addRegisterToTable(register);
        } else {
            console.error("SOMETHING WENT TO SHIT WHEN FETCHING DATA");
        }
    });
}

/*
    GET ALL REGISTERS button

    -> populate table with all registers
    TODO: Now only for sofar table in database
 */
if (getAllButton) {
    getAllButton.addEventListener('click', async () => {
        const apiData = await fetchApiData(API_URL.ALL);
        const allRegisters = apiData.map(register => RegisterRecord.fromJson(register));

        addRegistersToTable(allRegisters);
    });
}



