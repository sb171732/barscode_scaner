import { Telegraf,Markup } from "telegraf";
const token = '6743872728:AAGjGip0W4SY-_J38yrARi7XDXmvIc_PeFs'
const bot  = new Telegraf(token)
const url = 'https://prod-app51819042-7d52f6f36e7a.pages-ac.vk-apps.com/index.html'
bot.command('start', ctx=>{
    ctx.reply('Hello', Markup.keyboard([
        Markup.button.webApp('Запустить', url)
    ]))
})

bot.launch()