const { resolve } = require("path");
const store = require("./store");

function addMessages(user, message) {
    return new Promise((resolve, reject) => {
        if(!user || !message) {
            console.error("[Message controller] No hay usuario o mensaje")
            return reject("Los datos son incorrectos")
        }

        const fullMessage = {
        user: user,
        message: message,
        date: new Date(),
    }

    store.add(fullMessage);
    console.log(fullMessage);
    resolve(fullMessage);
    })
};

function getMessages(){
    return new Promise((resolve, reject) => {
        resolve(store.list());
    })
}

function updateMessages(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message){
            reject("invalid data");
            return false;
        };
        const result = await store.update(id, message);
        resolve(result);
    })
    
}

module.exports = {
    addMessages,
    getMessages,
    updateMessages
}