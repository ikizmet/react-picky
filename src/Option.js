import React from 'react';
import PropTypes from 'prop-types';
import { isDataObject } from './lib/utils';
const Option = props => {
  const {
    id,
    item,
    isSelected,
    labelKey,
    valueKey,
    selectValue,
    style,
    multiple,
    tabIndex,
    selectOnly,
    enableOnly,
    enableOnlyText
  } = props;
  const cssClass = isSelected ? 'option selected' : 'option';
  const body = isDataObject(item, labelKey, valueKey) ? item[labelKey] : item;
  const inputType = multiple ? 'checkbox' : 'radio';
  const select = () => selectValue(item);
  const only = () => selectOnly(item);
  return (
    <div
      tabIndex={tabIndex}
      id={id}
      role="option"
      style={style}
      data-testid="option"
      data-selected={isSelected ? 'selected' : ''}
      aria-selected={isSelected}
      className={cssClass}
      onClick={select}
      onKeyPress={e => {
        e.preventDefault();
        selectValue(item);
      }}
    >
      <input
        type={inputType}
        readOnly
        tabIndex={-1}
        checked={isSelected}
        aria-label={body}
        data-testid={'option-checkbox'}
      />
      {body}
      {enableOnly && 
        <button
          className="picky__only"
          id={id + '-option-only-' + tabIndex}
          onClick={e => {
            e.stopPropagation();
            only(item);
          }}
          >
          {props.enableOnlyText}
        </button>
      }
    </div>
  );
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  id: PropTypes.string,
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  style: PropTypes.object,
  selectValue: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectOnly: PropTypes.func.isRequired,
  enableOnly: PropTypes.bool,
  enableOnlyText: PropTypes.string
};
export default Option;
