const DOTENV = require('dotenv')
const cron = require('node-cron')

DOTENV.config({path:'./config.env'});

async function  fb_post(element,timeStamp) {
    timeStamp = new Date(timeStamp);
    let group = "887565045845764";
    let url = "https://graph.facebook.com/v16.0/"+group+"/feed?";
    let ampm = 'AM';
    let hour = 00;
    if(timeStamp.getHours() > 12 || (timeStamp.getHours() === 12 && timeStamp.getMinutes()>0)){
      ampm = 'PM';
      if(timeStamp.getHours() === 12) hour = timeStamp.getHours();
      else hour = timeStamp.getHours()-12;
    }
    let options = {
      method : "POST",
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify({
        "message":'🅲🅾🅽🆃🅴🆂🆃 🅰🅻🅴🆁🆃\nName : '+element.name+'\nTime : '+hour+':'+timeStamp.getMinutes()+':00 '+ampm+'\n',
        "link":"https://codeforces.com/contests/"+element.id,
        "access_token": process.env.ACCESS_CODE,
      })
    }
    fetch(url,options)
    .then((response) => response.json())
    .then((data) => console.log(data))
  }
  
async function doIt() {
    fetch("https://codeforces.com/api/contest.list?")
    .then((response) => response.json())
    .then((data) => {
      const {result} = data
      result.forEach(element => {
          if(element.phase === 'BEFORE'){
            //console.log(element.name);
             //let timeStamp = element.startTimeSeconds*1000;
             let timeStamp = Date.now();
            let time = new Date(timeStamp);
            let timeNow = Date.now();
            timeNow = new Date(timeNow);
            // fb_post(element,timeStamp)
            if(time.getDate()=== timeNow.getDate() && time.getMonth() === timeNow.getMonth()){
              console.log("Doing it....");  
              fb_post(element,timeStamp)
            }
          }
      });
    })
}
// doIt()
cron.schedule('10 * * * * *', () => {
    doIt()
});
