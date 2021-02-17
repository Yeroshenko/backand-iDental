const axios = require('axios')
const querystring = require('querystring')

function sendSMS({ number, text, time }) {
  this.API_ID = process.env.SMS_TOKEN
  this.isTest = process.env.DEVELOPMENT === 'TRUE'

  const params = {
    api_id: this.API_ID,
    to: number,
    msg: text,
    time: time,
    json: 1,
    test: +this.isTest
  }
  console.log(params)

  return axios.get(`https://sms.ru/sms/send?${querystring.stringify(params)}`)
}

module.exports = sendSMS