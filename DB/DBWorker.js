const config = require('../Core/consts').config;
const mysql = require("mysql");

//!!!
module.exports = class DBWorker {
    constructor() {
        this.connection = mysql.createPool(config);
    }

    getInfo = async () => {
        const info = await this.takeInfo().catch(()=>{throw new Error("Error at info data")});
        return info
    }

    takeInfo = async () => {
        return await new Promise((resolve, reject) => {
            this.connection.query(
                `SELECT * FROM events`,
                (err, resp) => {
                    if (err) {
                        console.log("Error at info data")
                        reject(-1)
                    }
                    resolve(resp)
                }
            )
        })
    }

    getEventByName = async (name) => {
        const event = await this.takeEventByName(name).catch(()=>{throw new Error("Error at name data")});
        return event
    }

    takeEventByName = async (name) => {
        return await new Promise((resolve, reject) => {
            this.connection.query(
                `SELECT * FROM events where name = "${name}"`,
                (err, resp) => {
                    if (err) {
                        console.log("Error at name data")
                        reject(-1)
                    }

                    resolve (resp)
                }
            )
        })
    }

    deleteEventByName = async (name) => {
        const event = await this.deleteThisEventByName(name).catch(()=>{throw new Error("Error at delete data")});
        return event
    }

    deleteThisEventByName = async (name) => {
        return await new Promise((resolve, reject) => {
            this.connection.query(
                `DELETE FROM events where name = "${name}"`,
                (err, resp) => {
                    if (err) {
                        console.log("Error at delete data")
                        reject(-1)
                    }

                    resolve (resp)
                }
            )
        })
    }

    saveEvent = async (name, date, description) => {
        const event = await this.saveThisEvent(name, date, description).catch(()=>{throw new Error("Error at INSERT data")});
        return event
    }

    saveThisEvent = async (name, date, description) => {
        return await new Promise((resolve, reject) => {
            this.connection.query(
                `INSERT INTO events (name, date, description) values ("${name}", "${date}", "${description}")`,
                (err, resp) => {
                    if (err) {
                        console.log("Error at INSERT data")
                        reject(-1)
                    }

                    resolve (resp)
                }
            )
        })
    }

    updateEvent = async (name, date, description) => {
        console.log(name, date, description)
        const event = await this.updateThisEvent(name, date, description).catch(()=>{throw new Error("Error at INSERT data")});
        return event
    }

    updateThisEvent = async (name, date, description) => {
        return await new Promise((resolve, reject) => {
            this.connection.query(
                `UPDATE events SET name = "${name}", date = "${date}", description = "${description}" where name = "${name}"`,
                (err, resp) => {
                    if (err) {
                        console.log("Error at INSERT data")
                        reject(-1)
                    }

                    resolve (resp)
                }
            )
        })
    }
}