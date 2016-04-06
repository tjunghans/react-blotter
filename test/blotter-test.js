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
  var div;

  function render(props) {
    ReactDOM.render(React.createElement(blotter, prepare(props)), div);
  }

  beforeEach(() => {
    div = document.createElement("div");
  });

  afterEach(() => {
    if (div) {
      ReactDOM.unmountComponentAtNode(div);
    }
  });

  it('renders blotter', () => {
    assert(true);
  });

});

