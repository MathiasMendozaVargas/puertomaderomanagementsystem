//////////////////////////////////////////
// Post Model 
// (or Schema, whatever u wanna call it)
///////////////////////////////////////////


const { mongoConnect, ObjectId } = require('../database/mongodb')
const db = mongoConnect()


// User Model
module.exports = class GeneralPost {
    constructor(user_id, text, image={data: Buffer, contentType: String}, title, nLikes=[], numComments=[]){
        this.user_id = user_id;
        this.text = text;
        this.image = image;
        this.title = title;
        this.nLikes = nLikes;
        this.numComments = numComments
    }

    // Save User
    async save(){
        // inserting user
        return (await db).collection('generalposts').insertOne(this)
    }

    // Get all the General Posts
    static async getAllGeneralPosts(){
        const generalposts = (await db).collection('generalposts').find().toArray()
        if(generalposts){
            return generalposts;
        }else{
            console.log("No posts found");
        }
    }
    

    // Update User info
    // static async updateByEmail(id, username, email, firstName, lastName, age, gender) {
    //     const result = (await db).collection("users")
    //     .updateOne(
    //         {_id: new ObjectId(id)},
    //         { $set:
    //             {'username' : username,
    //             'email'    : email,
    //             'firstName': firstName,
    //             'lastName' : lastName,
    //             'age'      : age,
    //             'gender'   : gender
    //         } });
    //         console.log(`Updated ${result}`);
    //     };
        
    // }
}
