import { RegisterRecord } from "./register.js";

const fetchButton = document.getElementById('fetchButton');
const createRegButton = document.getElementById('create-register-button');
const resultDiv = document.getElementById('result');
const userInput = document.getElementById('register_variable');

// REGISTERS FORMS
const addressForm = document.getElementById('address-form');
const labelForm = document.getElementById('label-form');
const dataTypeForm = document.getElementById('data_type-form');
const factorForm = document.getElementById('factor-form');
const unitForm = document.getElementById('unit-form');
const descriptionForm = document.getElementById('description-form');
const dataForm = document.getElementById('data-form');

const API_URL = {
    GET_ALL: "http://localhost:8081/api/v1/registers",
    GET_BY_ID: (id) => `http://localhost:8081/api/v1/registers/${id}`,
    GET_BY_LABEL: (label) => `http://localhost:8081/api/v1/registers/label/${label}`,
    GET_BY_ADDRESS: (address) => `http://localhost:8081/api/v1/registers/address/${address}`
};


/*
    fetch data requests to database API 
    @return data in JSON format
*/
export async function fetchApiData(url) {
    try {
        let response = await fetch(url); // wait for fetch to complete
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        let dataJson = await response.json() // wait for JSON conversion to complete
        console.log(`Fetched data ${dataJson}`);

        return dataJson;
    } catch (error) {
        console.error(error.message);
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
    dataTypeForm.value = register.dataType;
    factorForm.value = register.factor;
    unitForm.value = register.unit;
    descriptionForm.value = register.description;
    dataForm.value = register.data;
    
}

if (fetchButton) {
    // Event listener needs to be async because we call async fetchAllRegisters()
    fetchButton.addEventListener('click', async () => {
        // get selected API operation
        const selectedOperation = document.getElementById("api-operations").value;
        console.log(selectedOperation);

        let register = null;
        let registerList = null;

        // call selected API operation and get data
        switch (selectedOperation) {
            case "saveRegister": {
                console.log("saveRegister not defined");
                break;
            }
            case "saveRegisters": {
                console.log("saveRegisters not defined");
                break;
            }
            case "getRegisters": {
                const apiData = await fetchApiData(API_URL.GET_ALL);
                // JSON array so we have to convert to individual RegisterRecord objects
                registerList = apiData.map(register => RegisterRecord.fromJson(register));

                break;
            }
            case "getRegisterById": {
                let id = userInput.value;
                if (isNaN(id)) {
                    console.error("Given ID is not a number");
                }
                
                console.log(API_URL.GET_BY_ID(id));
                const apiData = await fetchApiData(API_URL.GET_BY_ID(id));
                register = RegisterRecord.fromJson(apiData);

                break;
            }
            case "getRegisterByLabel": {
                let label = userInput.value
                if (!isNaN(label)) {
                    console.error("Given LABEL is not a text");
                }

                console.log(API_URL.GET_BY_LABEL(label));
                const apiData = await fetchApiData(API_URL.GET_BY_LABEL(label));
                register = RegisterRecord.fromJson(apiData)

                break;
            }  
            case "getRegisterByAddress": {
                let address = userInput.value;
                if (isNaN(address)) {
                    console.error("Given ADDRESS is not a number");
                }

                console.log(API_URL.GET_BY_ADDRESS(address));
                const apiData = await fetchApiData(API_URL.GET_BY_ADDRESS(address));
                register = RegisterRecord.fromJson(apiData);

                break;
            }
            case "updateRegister": {
                console.log("updateRegister not defined");

                break;
            }
            case "deleteRegister": {
                console.log("deleteRegister not defined");

                break;
            }
            default:
                console.error("No option selected");
        }

        // determine if we have list or single RegisterRecord object
        if (registerList != null) { // list of registers
            addRegistersToTable(registerList);
        } else if (register != null) { // single register
            addRegisterToTable(register);
            addRegisterToForm(register);
        } else {
            console.error("SOMETHING WENT TO SHIT WHEN FETCHING DATA");
        }

       
    });
} else {
    console.error('Fetch button not found');
}

if (createRegButton) {
    createRegButton.addEventListener('click', () => {
        // Need to check that all required attributes exists
        if (addressForm.value.trim() === "" || labelForm.value.trim === "") {
            alert("Register address or label are empty!");
            return;
        }

        

    });
}
