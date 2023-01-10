const Model = require("./model");

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    })
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}



function addMessages(message) {
    const myMessage = new Model(message);
    myMessage.save();
};

async function getMessages(filterUser) {
    let filter = {};
    if(filterUser !== null) {
        filter = { user: filterUser}
    }
    const messages = await Model.find(filter);
    return messages;
};

function removeMessages(id) {
    return Model.deleteOne({
        _id: id
    })
}

module.exports = {
    add: addMessages,
    list: getMessages,
    update: updateText,
    remove: removeMessages
}