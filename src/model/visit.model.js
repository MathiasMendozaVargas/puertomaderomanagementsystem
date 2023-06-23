// require database for MongoDb
const { mongoConnect, ObjectId } = require("../database/mongodb");
const db = mongoConnect();


// Visit Model
module.exports = class Visit {
    constructor(People, Area, Land, Special_bus, Date, Time, Notes) {
        this.People = People,
        this.Area = Area,
        this.Land = Land,
        this.Special_bus = Special_bus,
        this.Date = Date,
        this.Time = Time,
        this.Notes = Notes
    }

    // Save Visit
    async save() {
        return (await db).collection("visits").insertOne(this);
    }

    // Get all the visits
    static async find() {
        return (await db).collection("visits").find().toArray();
    }
    
    // Find visit by id
    static async findById(id) {
        return (await db)
            .collection("visits")
            .find({ _id: new ObjectId(id) })
            .toArray();
    }

    // update visit
    static async updateOne(data) {
        return (await db).collection("visits").updateOne(
            { _id: new ObjectId(data.id) }, //filter
            {
                $set: {
                    People: data.People,
                    Area: data.Area,
                    Land: data.Land,
                    Special_bus: data.Special_bus,
                    Date: data.Date,
                    Time: data.Time,
                    Notes: data.Notes
                },
            }
        );
    }

    // delete visit
    static async deleteOne(id) {
        return (await db)
            .collection("visits")
            .deleteOne({ _id: new ObjectId(id) });
    }
}



