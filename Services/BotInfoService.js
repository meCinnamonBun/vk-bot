const DBWorker = require("../DB/DBWorker")

module.exports = class BotInfoService {
    constructor() {
        this.message = ""
        this.curStep = 0
        this.inProgress = false
        this.steps = {
            0: this.getInfo
        }
    }

    formAnswer = async (message) => {
        return await this.steps[this.curStep]()
    }

    getInfo = async () => {
        const dbWorker = new DBWorker()
        const info = await dbWorker.getInfo()
        let output = ""
        info.forEach(item => {
            output += "Мероприятие: " + item.name + "\nДата: " + item.date + "\nОписание: " + item.description + "\n\n"
        })
        return output
    }
}

// export default BotInfoService