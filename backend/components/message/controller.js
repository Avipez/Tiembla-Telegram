const { resolve } = require("path");
const store = require("./store");

function addMessages(chat, user, message, file) {
    return new Promise((resolve, reject) => {
        if(!user || !message) {
            console.error("[Message controller] No hay usuario o mensaje")
            return reject("Los datos son incorrectos")
        };

        let fileUrl = "";
        if(file){
            fileUrl = "http://localhost:3000/app/files/" + file.filename
        }

        const fullMessage = {
        chat:chat,
        user: user,
        message: message,
        date: new Date(),
        file: fileUrl,
    }

    store.add(fullMessage);
    console.log(fullMessage);
    resolve(fullMessage);
    })
};

function getMessages(filterMessages){
    return new Promise((resolve, reject) => {
        resolve(store.list(filterMessages));
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

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if(!id) {
            reject("id Invalido");
            return false;
        }
        store.remove(id)
            .then(() =>{
            resolve()
            })
            .catch( e => {
                reject(e)
            })
    })
}

module.exports = {
    addMessages,
    getMessages,
    updateMessages,
    deleteMessage,
}