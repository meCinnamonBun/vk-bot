const BotInfoService = require("../Services/BotInfoService")
const BotDeleteService = require("../Services/BotDeleteService")
const BotCreateService = require("../Services/BotCreateService")
const BotUpdateService = require("../Services/BotUpdateService")

module.exports = class ServiceFactory {
    constructor(message) {
        this.message = message
        this.states = {
            create: "создать",
            info: "мероприятия",
            delete: "удалить",
            update: "обновить"
        }
        this.services = {
            create: this.getBotCreateService,
            info: this.getBotInfoService,
            delete: this.getBotDeleteService,
            update: this.getBotUpdateService
        }
    }

    getBotUpdateService = () => {
        return new BotUpdateService()
    }

    getBotCreateService = () => {
        return new BotCreateService()
    }

    getBotInfoService = () => {
        return new BotInfoService()
    }

    getBotDeleteService = () => {
        return new BotDeleteService()
    }

    getService = () => {
        let state = this.getState()
        console.log(state)
        let service = this.services[state]()
        console.log(service)
        return service
    }

    getState = () => {
        let entries = Object.entries(this.states)

        console.log(this.message)
        let result = ""

        entries.forEach(element => {
            // console.log(element[0], element[1])
            if (element[1] === this.message) {
                // console.log(element[0])
                result = element[0]
            }
        })

        if (result === "") throw new Error("No such service!")
        return  result
    }
}

// export default ServiceFactory