import {RegisterRecord} from './register.js';

const register1 = new RegisterRecord('6', '1424', 'china', 'U64', '0.1', 'W', 'This is a shit register', 'null');
//console.log(register1.toJson());

const jsonRegister = '{"id":100,"address": 3244,"label":"mega doodoo","dataType":"I16","factor":"1","unit":"Hour","description":"This is a mega shit","data":"343"}';
const register2 = RegisterRecord.fromJson(jsonRegister);
//console.log(register2);


async function fetchApiData(url) {
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
        
        const dataJson = await response.json(); 
        // return response data
        return dataJson;
    }
    catch (error) {
        console.log(error.message);
    }
}

async function deleteApiData(url, address) {
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
    GET register by ID

const apiData = await fetchApiData('http://localhost:8081/api/v1/registers/address/1414');
const register3 = RegisterRecord.fromJson(apiData);
console.log(register3);
*/

/*
    GET all registers -> JSON array

const apiDataArray = await fetchApiData('http://localhost:8081/api/v1/registers');
const allRegisters = apiDataArray.map(register => RegisterRecord.fromJson(register));

for (let i = 0; i < 10; i++) {
    console.log(allRegisters[i]);
}
*/    

/*
    POST register
*/
console.log("POST");
const deleteRegister = new RegisterRecord("38010", "bro_tf", "U16", "1", "V", "Kamo uz funguj ty debile", "420");
/*
console.log(`OBJECT:\n${deleteRegister}\n`);
console.log(`JSON:\n${deleteRegister.toJson()}\n`);

const postResponse = await postApiData('http://localhost:8081/api/v1/registers', deleteRegister);

// fetch deleteRegister
console.log("FETCH");
const fetchResponse = await fetchApiData(`http://localhost:8081/api/v1/registers/address/${deleteRegister.address}`);
console.log(fetchResponse);*/


console.log("DELETE");
const resultDelete = await deleteApiData(`http://localhost:8081/api/v1/registers/address/${deleteRegister.address}`);
console.log(resultDelete);

/*
const resultPost = await postApiData("http://localhost:8081/api/v1/registers", postRegister);
console.log(resultPost);

const checkPost = await fetchApiData(`http://localhost:8081/api/v1/registers/address/${postRegister.address}`);
console.log(`From DB: ${checkPost}`);

 */