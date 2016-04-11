/*eslint-env mocha, browser*/
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import assert from 'assert';
import * as sinon from 'sinon';
import blotter from '../lib/blotter';

function $(selector, context) {
  context = context || document;
  return context.querySelectorAll(selector);
}

function prepare(props) {
  return props;
}

describe('component', () => {
  let div;

  function render(props) {
    ReactDOM.render(React.createElement(blotter, prepare(props)), div);
  }

  beforeEach(() => {
    div = document.createElement('div');
  });

  afterEach(() => {
    if (div) {
      ReactDOM.unmountComponentAtNode(div);
    }
  });

  it('renders blotter', () => {
    render({
      columnConfig: {
        status: {}
      }
    });

    assert.equal($('.blotter', div).length, 1);
    assert.equal($('.blotter thead th', div).length, 1);
    assert.equal($('.blotter thead th', div)[0].textContent, 'status');
  });

  it('renders thead and tbody', () => {
    render({
      columnConfig: {
        status: {}
      }
    });

    assert.equal($('.blotter thead', div).length, 1);
    assert.equal($('.blotter tbody', div).length, 1);
  });

  it('renders column title with given header', () => {
    render({
      columnConfig: {
        status: { header: 'Foo' }
      }
    });

    assert.equal($('.blotter th', div)[0].textContent, 'Foo');
  });

  it('renders data', () => {
    render({
      columnConfig: {
        status: {}
      },
      data: [{
        status: 'Ok'
      }]
    });

    assert.equal($('.blotter tbody tr', div).length, 1);
    assert.equal($('.blotter tbody tr td', div)[0].textContent, 'Ok');
  });

  it('renders markup', () => {
    render({
      columnConfig: {
        status: {},
        action: {
          markup(row) {
            return React.DOM.button({ 'data-id': row.id }, 'Update');
          }
        }
      },
      data: [{
        status: 'ok',
        id: 1
      }]
    });

    const button = $('.blotter tbody tr td:nth-child(2) button', div)[0];
    assert.equal(button.textContent, 'Update');
    assert.equal(button.getAttribute('data-id'), 1);
  });

  it('registers row onclick event', () => {
    const spy = sinon.spy();
    render({
      columnConfig: {
        action: {
          markup(row, props) {
            return React.DOM.button({
              onClick: props.onUpdate.bind(this, row.id)
            }, 'Update');
          }
        }
      },
      data: [{
        id: 1
      }],
      onUpdate: spy
    });

    ReactTestUtils.Simulate.click(div.querySelector('button'));

    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 1);
  });

  it('adds css class name to data row', () => {
    render({
      columnConfig: {
        status: {}
      },
      data: [{
        status: 'ok',
        rowClassName: 'foo'
      }]
    });

    assert.equal($('tbody tr.foo', div).length, 1);
  });

  it('applies colspan to column', () => {
    render({
      columnConfig: {
        amount: {
          header: 'Amount',
          columns: {
            ccy: {
              markup(row, props) { return row.amount.ccy; }
            },
            value: {}
          }
        }
      },
      data: [{
        amount: {
          ccy: 'CHF',
          value: '1234.56'
        }
      }]
    });

    assert.equal($('thead th', div).length, 1);
    assert.equal($('thead th', div)[0].getAttribute('colspan'), 2);
    assert.equal($('tbody td', div).length, 2);
    assert.equal($('tbody td', div)[0].textContent, 'CHF');
    assert.equal($('tbody td', div)[1].textContent, '1234.56');
  });

  it('applies css class to colspan column', () => {
    render({
      columnConfig: {
        amount: {
          header: 'Amount',
          columns: {
            ccy: {
              className: 'amount ccy'
            },
            value: {}
          }
        }
      },
      data: [{
        amount: {
          ccy: 'CHF',
          value: '1234.56'
        }
      }]
    });

    assert.equal($('tbody td.amount.ccy', div).length, 1);
    assert.equal($('tbody td.amount.ccy', div)[0].textContent, 'CHF');
  });

  it('adds markup colspan column', () => {
    render({
      columnConfig: {
        amount: {
          header: 'Amount',
          columns: {
            ccy: {
              markup(row, props) {
                return React.DOM.span({ className: 'tag' }, row.amount.ccy);
              }
            },
            value: {}
          }
        }
      },
      data: [{
        amount: {
          ccy: 'CHF',
          value: '1234.56'
        }
      }]
    });

    assert.equal($('tbody td span.tag', div).length, 1);
    assert.equal($('tbody td span.tag', div)[0].textContent, 'CHF');
  });

  it('sets columns width', () => {
    render({
      columnConfig: {
        status: {},
        amount: {
          header: 'Amount',
          columns: {
            ccy: {
              markup(row, props) {
                return React.DOM.span({ className: 'tag' }, row.amount.ccy);
              },
              width: 50
            },
            value: {
              width: 80
            }
          }
        }
      },
      data: [{
        amount: {
          ccy: 'CHF',
          value: '1234.56'
        }
      }]
    });

    assert.equal($('colgroup', div).length, 1);
    assert.equal($('colgroup>col', div).length, 3);
    assert.equal($('colgroup col', div)[1].getAttribute('width'), 50);
    assert.equal($('colgroup col', div)[2].getAttribute('width'), 80);
  });

});

