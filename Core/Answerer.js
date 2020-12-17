const ServiceFactory = require("./ServiceFactory")

module.exports = class Answerer {
    constructor() {
        this.curService = null
        this.message = ""
        this.error = false
    }

    getCurService = async () => {
        return this.curService
    }

    setUserMessage = message => { this.message = message }

    getAnswer = async () => {
        try {
            if (this.message.toLowerCase() === "отмена") {
                this.curService = null
                return "Отменено"
            }

            if (this.curService === null) {
                let factory = new ServiceFactory(this.message.toLowerCase())
                this.curService = factory.getService()
            }

            // console.log(this.curService)

            let result = await this.curService.formAnswer(this.message)
            if (!this.curService.inProgress) this.curService = null

            return result
        }
        catch (e) {
            return "Нет такой команды"
        }

        // if (this.curService === null) {
        //     let factory = new ServiceFactory(this.message)
        //     this.curService = factory.getService()//.catch(() => {this.error = true})
        // }
        //
        // console.log(this.curService)
        //
        // let result = this.curService.formAnswer(this.message)//.catch(() => {this.error = true})
        // if (this.error) return "Нет такой команды"
        // return result
    }
}

// export default Answerer