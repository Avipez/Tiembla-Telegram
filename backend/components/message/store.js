const Model = require("./model");
const db = require("mongoose");

db.set("strictQuery", false);

db.Promise = global.Promise;

//if your password in plain-text is p@ssw0rd'9'!, you need to encode your password as:
//p%40ssw0rd%279%27%21


db.connect("mongodb+srv://avipez:Ev%4004Love@test-telegram.pkrxdwt.mongodb.net/test"
, {
    useNewUrlParser: true,
});

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    })
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

console.log("[db] Conectada con exito")

function addMessages(message) {
    const myMessage = new Model(message);
    myMessage.save();
};

async function getMessages() {
    const messages = await Model.find();
    return messages;
};

module.exports = {
    add: addMessages,
    list: getMessages,
    update: updateText,
}