let usersSchema = require('./users-schema')
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let SECRET = 'myserverhasfleas';
class User {

    async create(record) {
        let findUser = await usersSchema.exists({ username: record.username });
        if (!findUser) {
            // the user is not in the DB so I can add him
            record.password = await bcrypt.hash(record.password, 5);
            let newRecord = new usersSchema(record);
            return await newRecord.save();
        }
        else {
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




    


    async generateToken(user) {
        console.log("inside generate token >>> ", user)
        const token = await jwt.sign({ username: user.username, capabilities: this.capabilities(user)}, SECRET);
        console.log(token)
        return token
    }





   async authenticateToken(token) {
        try {
            let tokenObject = await jwt.verify(token, SECRET);
            console.log("tokenObject : ", tokenObject);
            let isInDB = usersSchema.exists(tokenObject.username);
            return isInDB ? Promise.resolve(tokenObject) : Promise.reject();
        } catch(err) {
            return Promise.reject();
        }
    }



    capabilities(user) {
        console.log('capabilities executed');
        if (user.role === 'admin') {
          return ['read', 'create', 'update', 'delete'];
        }
        if (user.role === 'user') {
          return ['read'];
        }
        if (user.role === 'writer') {
          return ['read', 'create'];
        }
        if (user.role === 'editor') {
          return ['read', 'create', 'update'];
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