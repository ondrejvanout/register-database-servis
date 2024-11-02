export class RegisterRecord {
    constructor(id, address, label, dataType, factor, unit, description, data) {
        this.id = id;
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
        return new RegisterRecord(
            jsonData.id,
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