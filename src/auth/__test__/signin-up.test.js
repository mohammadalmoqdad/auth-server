const { app } = require('../../../server.js');
const supergoose = require('supergoose');
const mockRequest = supergoose(app);
const user_collection = require('../models/user-collection');





describe("User DB Module", () => {

    it("Create a new user (signup) should return reaten user object", async () => {
        let userObj = {
            username: "mohammadtee2",
            password: "1234"
        }
        let newUser = await mockRequest.post('/signup').send(userObj);
        let record = newUser.body;
        console.log("record is the newUserbody >>>>", record)
        let res = await user_collection.isUser(userObj.username, userObj.password)
        expect(res).toEqual(true);

    });





    it("Create a new user (signup) should return reaten user object", async () => {
        let userObj = {
            username: "mohammadtee2",
            password: "1234"
        }
        let newUser = await mockRequest.post('/signup').send(userObj);
        let record = newUser.body;
        console.log("record is the newUserbody >>>>", record)
        let currentUser = await mockRequest.post('/signin')
        let currentUserdata = currentUser.body
        let res = await user_collection.isUser(userObj.username, userObj.password)
        expect(res).toEqual(true);

    });


})



