import {RegisterRecord} from './register.js';

const register1 = new RegisterRecord('6', '1424', 'shit', 'U64', '0.1', 'W', 'This is a shit register', 'null');
console.log(register1.toJson());

const jsonRegister = '{"id":100,"address": 3244,"label":"mega doodoo","dataType":"I16","factor":"1","unit":"Hour","description":"This is a mega shit","data":"343"}';
const register2 = RegisterRecord.fromJson(jsonRegister);
console.log(register2);


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

/*
    GET register by ID
*/
const apiData = await fetchApiData('http://localhost:8081/api/v1/registers/address/1414');
const register3 = RegisterRecord.fromJson(apiData);
console.log(register3);

/*
    GET all registers -> JSON array
*/
const apiDataArray = await fetchApiData('http://localhost:8081/api/v1/registers');
const allRegisters = apiDataArray.map(register => RegisterRecord.fromJson(register));

for (let i = 0; i < 10; i++) {
    console.log(allRegisters[i]);
}
    
