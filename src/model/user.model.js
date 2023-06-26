//////////////////////////////////////////
// User Model 
// (or Schema, whatever u wanna call it)
///////////////////////////////////////////


const { mongoConnect, ObjectId } = require('../database/mongodb')
const db = mongoConnect()


// User Model
module.exports = class User {
    constructor(department, username, email, firstName, lastName, password, age, gender){
        this.department = department
        this.username = username
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.password = password
        this.age = age
        this.gender = gender
    }

    // Save User
    async save(){
        // inserting user
        return (await db).collection('users').insertOne(this)
    }

    // Find User by email
    static async findUserbyEmail(email){
        // find user by email
        const user = (await db).collection('users').findOne({ email: email })
        if(user){
            return user
        }
        else{
            return null
        }
    }

    // Find User by id
    static async findUserbyId(id){
        // find user by email
        const user = (await db).collection('users').findOne({ _id: new ObjectId(id) })
        if(user){
            return user
        }
        else{
            return null
        }
    }

    // Find User by username
    static async findUserbyUsername(username){
        // find user by email
        const user = (await db).collection('users').findOne({ username: username })
        if(user){
            return user
        }
        else{
            return null
        }
    }

    // Get all the users
    static async getAllUsers(){
        const users = (await db).collection('users').find().toArray()
        if(users){
            return users;
        }else{
            users
        }
    }
    

    // Update User info
    static async updateByEmail(id, username, email, firstName, lastName, age, gender) {
        const result = (await db).collection("users")
        .updateOne(
            {_id: new ObjectId(id)},
            { $set:
                {'username' : username,
                'email'    : email,
                'firstName': firstName,
                'lastName' : lastName,
                'age'      : age,
                'gender'   : gender
            } });
            console.log(`Updated ${result}`);
        };
        
    }
