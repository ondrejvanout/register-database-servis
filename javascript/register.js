export class RegisterRecord {
    // removed record id attribute -> dont know if its needed
    constructor(address, label, dataType, factor, unit, description, data) {
        this.address = address;
        this.label = label;
        this.dataType = dataType;
        this.factor = factor;
        this.unit = unit;
        this.description = description;
        this.data = data;
    }

    /*
        Serialize the RegisterRecord object to JSON
    */
    toJson() {
        return JSON.stringify(this);
    }

    /*
        Deserialize the JSON object to RegisterRecord instance
    */
   static fromJson(jsonData) {
        //console.log(jsonData);
        // check if data exist
        if (!jsonData) {
            throw new Error("jsonData is undefined or null");
        }

        return new RegisterRecord(
            jsonData.address,
            jsonData.label,
            jsonData.dataType,
            jsonData.factor,
            jsonData.unit,
            jsonData.description,
            jsonData.data
        );
   }

    
}