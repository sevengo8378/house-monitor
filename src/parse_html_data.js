/**
 * Created by byrne on 2016/10/21.
 */

import log4js from 'log4js'
let logger = log4js.getLogger('get_lianjia_page')

export default (html, searches) => {
  // logger.debug(html)
  let result = {}
  let keys = Object.keys(searches)
  for(let itemName of keys) {
    result[itemName] = parseItem(html, searches[itemName])
  }
  return result
}

function parseItem(html, itemCfg) {
  switch(itemCfg.type) {
    case 'regexp':
      return parseRegexp(html, itemCfg)
      break

    default:
      throw new Error(`unsupported config type: ${itemCfg.type}`)
      break
  }
}

function parseRegexp(html, itemCfg) {
  let regexp = itemCfg.regexp
  let result = regexp.exec(html)
  if(result && result.length == 1) {
    result = result[0].split(' ')[1]
    logger.debug(`${itemCfg.ch_name} = ${result}`)
    return result
  } else {
    throw new Error(`error while parse ${itemCfg.ch_name}`)
  }
}
