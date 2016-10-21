/**
 * Created by byrne on 2016/10/21.
 */

import log4js from 'log4js'
import request from 'request'
let logger = log4js.getLogger('get_lianjia_page')

export default () => {
  return new Promise((resolve, reject) => {
    let url = `http://sh.lianjia.com/`
    let options = {
      method: 'GET',
      url: url,
      // headers: {
      //   'Content-Type' : 'application/json'
      // },
      // body: data,
      // json: true
    };

    request(options, (error, response, body) => {
      if(!error && response.statusCode.toString().charAt(0) === '2') {
        resolve({data:body, status:response.statusCode});
      } else {
        logger.error(`[HTTP ${options.method} ${response.statusCode}] error: ${error ? error.toString() : response.statusCode}`)
        let ed = new Error(`${options.url} ${response.statusCode}`)
        throw ed;
        reject(ed)
      }
    })
  })
}
