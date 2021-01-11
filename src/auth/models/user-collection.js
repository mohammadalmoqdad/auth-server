let usersSchema = require('./users-schema')
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
class User {

    async create(record) {
        let findUser = await usersSchema.exists({ username: record.username });
        if (!findUser) {
            // the user is not in the DB so I can add him
            record.password = await bcrypt.hash(record.password, 5);
            let newRecord = new usersSchema(record);
            return await newRecord.save()
        }
        else {
            return "user is already exitsts";
        }

    }



    async isUser(username, password) {
        let findUserName = await usersSchema.exists({ username: username });
        if (findUserName) {
            let userObj = await usersSchema.find({ username: username });
            console.log(userObj)
            let DBpass = userObj[0].password; // it issssssssss an arrrraaaaaaaaaaaaaaaaaaaaaayyyyyyyyyyy
            return await bcrypt.compare(password, DBpass);
        }
        else return Promise.reject();
    }



    
    
    
    async generateToken(username) {
        return await jwt.sign({username: username}, SECRET);
    }



    async getAll() {
        return await usersSchema.find({});
    }
}

module.exports = new User();