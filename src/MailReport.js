/**
 * Created by byrne on 2016/10/21.
 */

import React from 'react'
import {ReportTable} from 'data-automation'

/**
 * example of props:
 * {
 *  name: 'table名'
 *  header: ['字段1', '字段2'],
 *  rows: [
 *    ['value1', 'value2'],
 *    ['value3', 'value4']
 *  ],
 *  bgColorFn: (row, column, value) => {}
 * }
 */
export default class MailReport extends React.Component {
  render() {
    let globalStyle = {
      'lineHeight': '130%'
    }
    let table = this.props.table
    return (
      <div style={globalStyle}>
        <ReportTable name={table.name} header={table.header} rows={table.rows} />
      </div>
    )
  }
}
