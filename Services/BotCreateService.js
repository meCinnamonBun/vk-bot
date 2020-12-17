const DBWorker = require("../DB/DBWorker")

module.exports = class BotCreateService {
    constructor() {
        this.message = ""
        this.curStep = 0
        this.inProgress = true

        this.name = ""
        this.date = ""
        this.description = ""

        this.steps = {
            0: this.askName,
            1: this.askDate,
            2: this.askDescription,
            3: this.confirm
        }

        this.DBWorker = "Мероприятие из БД\nДата\nОписание"
    }

    formAnswer = async (message) => {
        this.message = message
        return await this.steps[this.curStep]()
    }

    askName = async () => {
        this.curStep++
        return "Введите название мероприятия"
    }

    askDate = async () => {
        this.name = this.message
        this.curStep++
        return "Введите дату"
    }

    askDescription = async () => {
        if (this.dataIsValid(this.message)) {
            this.date = this.message
            this.curStep++
            return "Введите описание"
        }
        else {
            return "Неверная дата. Повторите ввод"
        }
    }

    dataIsValid = data => {
        // если data конвертируется
        return true
    }

    tryWriteData = async () => {
        const dbWorker = new DBWorker()
        const event = await dbWorker.saveEvent(this.name, this.date, this.description)
    }

    confirm = async () => {
        this.description = this.message
        await this.tryWriteData()
        this.inProgress = false
        return "Успешно!\n\n" + this.name + "\n" + this.date + "\n" + this.description + "\n"
    }

}