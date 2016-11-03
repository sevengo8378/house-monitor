/**
 * @param {Type}
 * @return {Type}
 */

'use strict';
// import 'babel-polyfill'
import log4js from 'log4js'
import yargs from 'yargs'
import moment from 'moment'
import get_lianjia_page from './get_lianjia_page'
import parse_html_data from './parse_html_data'
import consume_results from './consume_results'

process.on('uncaughtException', globalErrHandler);
process.on('unhandledRejection', globalErrHandler);
function globalErrHandler(err) {
  let errorStackTrace = err instanceof Error ? err.stack || err.stacktrace || "" : err.toString();
  console.error('App crash', `Err:\n ${errorStackTrace}`);
  process.exit(1);
}

log4js.setGlobalLogLevel('trace')
const logger = log4js.getLogger('index')

// yargs.option('l', {
//     alias: 'loglevel',
//     demand: false,
//     type: 'string',
//     /*
//      * babel-node命令后面如果带debug参数就会进入debug模式, 所以这里用trace来代替debug
//      */
//     choices: ['trace', 'info', 'warn', 'error'],
//     default: 'debug',
//     describe: '设置loglevel, 可以是 trace/info/warn/error, 注意这里不能是debug',
//   })
//   .usage(`Usage: ${cmd} [options]`)
//   .example(`${cmd} --duration 1d --loglevel trace --report --send --monitor --kibana`)
//   .help('h')
//   .alias('h', 'help')

logger.info(`fetching lianjia page`)
const searches = {
  resold: {
    type: 'regexp',
    regexp: /上海链家真实在售二手房 [0-9]+ 套/,
    ch_name: '二手房'
  },
  rent: {
    type: 'regexp',
    regexp: /上海链家真实租房 [0-9]+ 套/,
    ch_name: '租房'
  }
}
get_lianjia_page().then((data) => {
  let html = data.data
  let results = parse_html_data(html, searches)
  results.date = moment().format('YYYYMMDD')
  logger.info(`parse result = ${JSON.stringify(results, null, 2)}`)
  consume_results(results)
}).catch((err) => {
  globalErrHandler(err)
})


