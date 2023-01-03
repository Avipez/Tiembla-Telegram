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

module.exports = {
    addMessages,
    getMessages
}