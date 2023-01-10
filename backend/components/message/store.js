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

function getMessages(filterUser) {
    return new Promise(function (resolve, reject){
        let filter = {};
        if(filterUser !== null) {
            filter = { user: filterUser}
        }
    
        Model.find(filter)
            .populate("user")
            .exec((error, populated) => {
                if(error) {
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
    })
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