/**
 * Created by byrne on 2016/10/21.
 */

import fs from 'fs'
import {Alo7MsgSender} from 'alo7msgsender'
import {HtmlReport} from 'data-automation'
import MailReport from './MailReport'
import log4js from 'log4js'
let logger = log4js.getLogger('get_lianjia_page')

export default (result) => {
  let historyFile = `${__dirname}/../history.txt`
  let history = readHistory(historyFile)
  let {date, ...rest} = result
  history[result.date] = rest
  logger.debug(`history updated: ${JSON.stringify(history, null, 2)}`)
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2), 'utf8')
  sendMail(history)
}

function readHistory(file) {
  if(fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file))
  }
  return {}
}

function sendMail(history) {
  let table = {name: '每日数据', header: ['日期', '二手房(套)', '租赁房(套)']}
  let rows = []
  let days = Object.keys(history).sort().reverse()
  for(let day of days) {
    let item = history[day]
    rows.push([day, item.resold, item.rent])
  }
  table.rows = rows
  let htmlData = {table: table}
  let html = HtmlReport.build(htmlData, MailReport)
  let mailInfo = {
    'to': ['sevengo8378@gmail.com', 'shufujia0222@hotmail.com'],
    'subject': '上海房产每日数据',
    'content': html,
    'plain_text': false
  }
  Alo7MsgSender.sendMail(mailInfo)
  fs.writeFileSync(`${__dirname}/../mail.html`, html, 'utf8')
}
