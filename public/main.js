/*eslint-env browser*/
import React from 'react';
import ReactDOM from 'react-dom';
import Blotter from '..';
const DOM = React.DOM;

const data = {
  rows: [
    {
      tradeId: 0,
      type: 'Spot',
      maturity: '2016-04-04T13:10:53+02:00',
      client: 'Thomas Junghans',
      amount: { ccy: 'CHF', value: '1234.56' }
    }, {
      tradeId: 1,
      type: 'Forward',
      client: 'Max Muster',
      amount: { ccy: 'USD', value: '6789.10' }
    }
  ]
};

function deleteRow(id) {
  console.log(`delete ${id}`);
}

function formatRow(data) {
  return {
    tradeId: data.tradeId,
    type: data.type,
    time: data.maturity || 'n/a',
    client: data.client,
    amount: data.amount,
    rowClassName: data.type.toLowerCase() === 'spot' ? 'spot' : ''
  };
}


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
      markup(row) {
        return DOM.div({ className: 'value' }, row.time);
      }
    },
    client: {
      className: 'client',
      header: 'Client',
      markup(row) {
        return DOM.div({ className: 'value' }, row.client);
      }
    },
    amount: {
      header: 'Amount',
      columns: {
        ccy: {
          markup(row, props) {
            return DOM.span({ className: 'tag' }, row.amount.ccy);
          }
        },
        value: {}
      }
    },
    action: {
      className: 'action',
      header: DOM.span({ style: { color: 'red' } }, 'Action'),
      markup(row, props) {
        return DOM.button({
          onClick: props.onDelete.bind(this, row.tradeId)
        }, 'delete');
      }
    },
    details: {
      className: 'details',
      header: 'Details',
      markup(row, props) {
        return DOM.button({
          onClick: props.onShowDetails.bind(this, row.tradeId)
        }, 'show details');
      }
    }
  },
  formatRow,
  data: data.rows,
  onDelete(tradeId) {
    deleteRow(tradeId);
  },
  onShowDetails(tradeId) {
    console.log('showing details for ', this.props.data.tradeId);
  }
}), document.querySelector('#blotter-1'));
