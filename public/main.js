/*eslint-env browser*/
import React from 'react';
import ReactDOM from 'react-dom';
import Blotter from '..';
const DOM = React.DOM;

// Example 1
ReactDOM.render(React.createElement(Blotter, {
  columnConfig: {
    type: {
      header: 'Type',
      className: 'type'
    },
    time: {
      className: 'time maturity',
      header: DOM.span({ style: { color: 'green' } }, 'Time'),
      markup: (data) => {
        return DOM.div({ className: 'value' }, data);
      }
    },
    client: {
      className: 'client',
      header: 'Client',
      markup: (data) => {
        return DOM.div({ className: 'value' }, data);
      }
    }
  },
  data: {
    rows: [
      {
        type: 'Spot',
        maturity: '2016-04-04T13:10:53+02:00',
        client: 'Thomas Junghans'
      }, {
        type: 'Forward',
        client: 'Danail Irinchev'
      }
    ]
  },
  dataFormatter(data) {
    return data.rows.map((row) => {
      return {
        type: row.type,
        time: row.maturity || 'n/a',
        client: row.client
      };
    });
  }
}), document.querySelector('#blotter-1'));


