// import { VK } from 'vk-io';

// import pkg from 'vk-io';
// const { VK } = pkg;

// const VK = require('vk-io'.VK);
//
// const vk = new VK({
//     token: process.env.TOKEN
// });
//
// async function run() {
//     const response = await vk.api.wall.get({
//         owner_id: 1
//     });
//
//     console.log(response);
// }
//
// run().catch(console.log);



console.log("Started")

const express = require("express")
const app = express()
const Answerer = require("./Answerer")

const VkBot = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup');

const bot = new VkBot(process.env.TOKEN);
const answerer = new Answerer();

// bot.on((ctx) => {
//     let body = ctx.message.body.toLowerCase()
//     if (body.includes("спорт")) {
//         ctx.reply('Select your sport', null, Markup
//             .keyboard([
//                 'Football',
//                 'Basketball',
//             ])
//             .oneTime());
//     } else {
//         ctx.reply('Hello!');
//     }
// });
bot.event('/start', (ctx) => {
    ctx.reply('Все операции представлены на клавиатуре. В процессе выполнения напишите "отмена" для прерывания текущей операции');
    setTimeout(() => sendKeyboard(ctx.message.user_id), 500);
});


bot.event('message_edit', (ctx) => {
    ctx.reply('Your message was edited');
});

bot.event('message_new', async (ctx) => {
    let body = ctx.message.body
    answerer.setUserMessage(body)

    let answer = await answerer.getAnswer()

    // if (answer === "Нет такой команды") sendKeyboard(ctx.message.user_id)

    ctx.reply(answer)

    const service = await answerer.getCurService()
    console.log(service)
    if (service === null){
        setTimeout(() => sendKeyboard(ctx.message.user_id), 500);
    }
})

bot.startPolling((err) => {
    if (err) {
        console.error(err);
    }
});

sendKeyboard = (id) => {
    bot.sendMessage(id, "Выберите операцию", null, Markup
        .keyboard([
            'Создать',
            'Обновить',
            'Удалить',
            'Мероприятия',
        ])
        .oneTime())
}

// bot.command('/sport', (ctx) => {
//     ctx.reply('Select your sport', null, Markup
//         .keyboard([
//             'Football',
//             'Basketball',
//         ])
//         .oneTime());
// });
//
// bot.command('/mood', (ctx) => {
//     ctx.reply('How are you doing?', null, Markup
//         .keyboard([
//             [
//                 Markup.button('Normally', 'primary'),
//             ],
//             [
//                 Markup.button('Fine', 'positive'),
//                 Markup.button('Bad', 'negative'),
//             ],
//         ]));
// });



// const express = require('express');
// const bodyParser = require('body-parser');
// const VkBot = require('node-vk-bot-api');
//
// const app = express();
// const bot = new VkBot({
//     token: process.env.TOKEN,
//     confirmation: process.env.CONFIRMATION,
// });
//
// bot.on((ctx) => {
//     ctx.reply('Hello!');
// });
//
// app.use(bodyParser.json());
//
// app.post('/', bot.webhookCallback);
//
// app.listen(process.env.PORT);

//
// // console.log("Hello")
//
// const express = require('express')
// const app = express()
// const port = 3000
// const bodyParser = require('body-parser')
//
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())
//
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
//
// app.post('/', (req, res) => {
//     console.log(req.body)
//
//     const {body} = req
//
//     switch (body.type) {
//         case 'confirmation':{
//             console.log("Confirming")
//             res.end("139a1929")
//             break
//         }
//         case 'message_new':{
//             res.end("ok")
//             break
//         }
//
//         default:
//             res.end("ok")
//             break
//     }
// })
//
// app.listen(port, () => {
//     console.log(`VK BOT listening at http://localhost:${port}`)
// })