/*eslint-env mocha, browser*/
import React from 'react';
import ReactDOM from 'react-dom';
//import ReactTestUtils from 'react-addons-test-utils';
import assert from 'assert';
//import * as sinon from 'sinon';
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
    assert.equal($('.blotter th', div).length, 1);
    assert.equal($('.blotter th', div)[0].textContent, 'status');
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

});

