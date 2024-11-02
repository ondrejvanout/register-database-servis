import {RegisterRecord} from './register.js'

const register1 = new RegisterRecord('6', '1424', 'shit', 'U64', '0.1', 'W', 'This is a shit register', 'null');
console.log(register1.toJson());

const jsonRegister = '{"id":100,"address": 3244,"label":"mega doodoo","dataType":"I16","factor":"1","unit":"Hour","description":"This is a mega shit","data":"343"}';
const register2 = RegisterRecord.fromJson(jsonRegister);
console.log(register2);


