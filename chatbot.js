// token taken from telegram bot
var token = "........";
var teleURL = "https://api.telegram.org/bot" + token;
// webappURL taken from URL given after running setWebhook() function
var webappURL = ".......";



function setWebhook(){
var url = teleURL + "/setWebhook?url=" + webappURL;
var response = UrlFetchApp.fetch(url);
}

function sendMsg(chat_id, text){
var url = teleURL + "/sendMessage?chat_id=" + chat_id + "&text="+ text;
var response = UrlFetchApp.fetch(url);
}

function doPost(e){

var contents = JSON.parse(e.postData.contents);
var chat_id = contents.message.from.id;
var text = contents.message.text;
// ssId taken from google sheets URL (/d/<<ssId>>/edit)
var ssId = "13r2t3A5kqcPx8H3nRQJ5SOeMv08R3L_IXG7_9BYnVJs";
var sheet = SpreadsheetApp.openById(ssId).getSheetByName("SHEET NAME");


  if (text == "budget"){

    var budget = sheet.getDataRange().getCell(1,2).getValue();
    return sendMsg(chat_id, budget);

  }else if (text=="expenses"){

    var expenses = sheet.getDataRange().getCell(2,2).getValue();
    return sendMsg(chat_id, expenses);

  }else if(text == "food expenses"){
    var foodExp = sheet.getDataRange().getCell(4,2).getValue();
    return sendMsg(chat_id, foodExp);

  }else if(text == "transport expenses"){
    var transExp = sheet.getDataRange().getCell(5,2).getValue();
    return sendMsg(chat_id, transExp);
    
  }else if(text == "misc expenses"){
    var miscExp = sheet.getDataRange().getCell(6,2).getValue();
    return sendMsg(chat_id, miscExp);
    
  }
  else if (text=="savings"){
    var savings = sheet.getDataRange().getCell(3,2).getValue();
    return sendMsg(chat_id, savings);

  }else if(text == "help"){
    return sendMsg(chat_id, "okay bro simple one, (item) - (Food) - (Transport) - (Misc).");

  }else{
    if(text.indexOf("-") !== -1){
      var dateNow = new Date;
      var reformattedDate = dateNow.getMonth() + 1 + "/" + dateNow.getDate();
      var item = text.split("-");

      if(text.indexOf("trip") == -1){

        sheet.appendRow([reformattedDate, item[0], item[1], item[2], item[3]]);
        return sendMsg(chat_id, "Noted!");

      }
    }else{
      return sendMsg(chat_id, "Please enter again.");
    }
  }
}




































