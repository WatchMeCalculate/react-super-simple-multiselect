import React from 'react';
import PropTypes from 'prop-types';

class SimpleMultiSelect extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,

    className: PropTypes.string,
    disabled: PropTypes.bool,
    selectedOptions: PropTypes.array,
    size: PropTypes.number,
    keyProp: PropTypes.string,
    valueProp: PropTypes.string,
  }

  static defaultProps = {
    className: 'SimpleMultiSelect',
    disabled: false,
    selectedOptions: [],
    size: 7,
    keyProp: 'text',
    valueProp: 'value',
  }

  constructor(props) {
    super(props);
    const { options, selectedOptions } = props;
    this.state = {
      selectedOptions,
      options,
    };
  }

  updateSelectedOptions = (e) => {
    const el = e ? e.target : this.select;
    const selectedOptions = [];
    for (let i = 0, l = el.options.length; i < l; i += 1) {
      if (el.options[i].selected) {
        selectedOptions.push(el.options[i].value);
      }
    }
    if (e || String(this.state.selectedOptions) !== String(selectedOptions)) {
      this.setState({ selectedOptions });
      this.props.onChange(selectedOptions);
    }
  }

  render() {
    const {
        selectedOptions,
        options,
        className,
        disabled,
        size,
        keyProp,
        valueProp,
    } = this.props;
    return (
      <div className={className}>
        <select
          multiple
          ref={select => this.select = select}
          size={size}
          value={selectedOptions}
          disabled={disabled}
          onChange={this.updateSelectedOptions}>
          {options.map((option) => {
            return (<option key={option[valueProp]} value={option[valueProp]}>
              {option[keyProp]}
            </option>);
          })}
        </select>
      </div>);
  }
}
export default SimpleMultiSelect;
