let usersSchema = require('./users-schema')
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let SECRET = 'myserverhasfleas';
class User {

    async create(record) {
        console.log("before findOnnneeeee11111")
        let findUser = await usersSchema.exists({ username: record.username });
        console.log("before findOnnneeeee")
        if (!findUser) {
        console.log("findeeeeed")

            // the user is not in the DB so I can add him
            record.password = await bcrypt.hash(record.password, 5);
            let newRecord = new usersSchema(record);
            return await newRecord.save()
        }
        else {
        console.log("after find oneeeeeeee")

            let DBUser = await usersSchema.findOne({ username: record.username })
            return DBUser;
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
        console.log("inside generate token >>> ", username)
        let token = await jwt.sign({ username: username }, SECRET);
        console.log(token)
        return token
    }





   async authenticateToken(token) {
        try {
            let tokenObject = await jwt.verify(token, SECRET);
            console.log("tokenObject : ", tokenObject);
            let isInDB = usersSchema.exists(tokenObject);
            return isInDB ? Promise.resolve(tokenObject) : Promise.reject();
        } catch(err) {
            return Promise.reject();
        }
    }









    async getAll() {
        return await usersSchema.find({});
    }


    async delete(_id) {
        return await usersSchema.findByIdAndDelete(_id)
    }
}

module.exports = new User();