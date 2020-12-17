const DBWorker = require("../DB/DBWorker")

module.exports = class BotDeleteService {
    constructor() {
        this.message = ""
        this.curStep = 0
        this.inProgress = true
        this.confirminationStates = {
            yes: "да",
            no: "нет"
        }

        this.confirminationAnswers = {
            yes: this.confirmYes,
            no: this.confirmNo
        }

        this.steps = {
            0: this.askName,
            1: this.askConfirmination,
            2: this.confirm
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

    askConfirmination = async () => {
        if (await this.nameIsValid(this.message)) {
            this.name = this.message
            this.curStep++
            return "Ваше мероприятие: " + this.message + "\n\nУдалить?"
        }
        else {
            return "Мероприятие не найдено. Повторите ввод"
        }
    }

    nameIsValid = async (name) => {
        const dbWorker = new DBWorker()
        const event = await dbWorker.getEventByName(name)
        return event !== "";
    }

    confirm = async () => {
        return await this.getConfAnswers()
    }

    confirmYes = async () => {
        this.inProgress = false
        const dbWorker = new DBWorker()
        await dbWorker.deleteEventByName(this.name)
        return "Мероприятие удалено"
    }

    confirmNo = async () => {
        this.inProgress = false
        return "Отменено"
    }

    confirmError = () => {
        this.inProgress = true
        return "Ответ не распознан. Удалить?"
    }

    getConfAnswers = async () => {
        let state = this.getConfState()
        let answer
        if (state === "") answer = this.confirmError()
        else answer = await this.confirminationAnswers[state]()
        return answer
    }

    getConfState = () => {
        let entries = Object.entries(this.confirminationStates)

        let result = ""

        entries.forEach(element => {
            if (element[1] === this.message.toLowerCase()) {
                result = element[0]
            }
        })

        return result
    }
}