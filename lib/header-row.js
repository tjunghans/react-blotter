import { createClass, DOM as dom, PropTypes as propTypes } from 'react';

export default createClass({
  displayName: 'BlotterHeader',
  propTypes: {
    columnConfig: propTypes.object.isRequired
  },
  render() {
    const configs = this.props.columnConfig;
    const cols = Object.keys(configs).map((id) => {
      const config = configs[id];
      return dom.th({ key: id, className: config.className },
        config.header || id);
    });
    return (
      dom.tr(null, cols)
    );
  }
});
