const { Telegraf } = require("telegraf");
const axios = require('axios')
const token = '6743872728:AAGjGip0W4SY-_J38yrARi7XDXmvIc_PeFs'
const bot = new Telegraf(token)
const  {BarcodeReader} = require("dynamsoft-javascript-barcode") ;
const pReader = null
function decodeImg(e)  {
    try {
      const reader = (pReader = pReader || BarcodeReader.createInstance());
      let results =  reader.decode(e.target.files[0]);
      for (let result of results) {
            this.push_barcode(result.barcodeText)
            // alert(result.barcodeText);
      }
      if (!results.length) { alert('No barcode found'); }
    } catch (ex) {
      let errMsg;
      if (ex.message?.includes("network connection error")) {
        errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
      } else {
        errMsg = ex.message||ex;
      }
      console.error(errMsg);
      alert(errMsg);
    }
    e.target.value = '';
  }

bot.command('start', ctx =>{
   ctx.reply('Привет сфотай код imei телефона и отправь мне')
})

bot.on('message', (ctx)  => {
    // const chatId = ctx.chat.id;
    let photo = ctx.update.message.photo
    let file_id = photo[photo.length -1].file_id 
    console.log(file_id)
    // const file_id = resp.photo[count-1].file_id
    // ctx.replyWithPhoto(resp.photo[count-1])
    axios.get(`https://api.telegram.org/bot${token}/getFile?file_id=${file_id}`)
    .then(function (response) {
      // handle success
      // print("123.png").then(console.log);
    //   bot.sendMessage(chatId, "Отправлено на печать!" );
      
      const downloadURL = 
        `https://api.telegram.org/file/bot${token}/${response.data.result.file_path}`;
  
      // download the file (in this case it's an image)
      download(downloadURL, path.join(__dirname, `${response.data.result.file_path}`), () =>
        print(`${response.data.result.file_path}`).then(console.log("Done!"))
       );
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });



})

bot.launch()