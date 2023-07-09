import React, { useState, useEffect, useRef } from 'react';
import InlineSVG from 'svg-inline-react';
import { getIntlMessage } from 'utils/Translate';
import CloseIcon from './../../assets/svg/close.svg';
import styles from './styles/editable-select-dropdown.scss';
interface EditableSelectDropdownProps {
  items: string[];
  placeholder?: string;
  selectBoxWidth?: string;
  searchBoxWidth?: string;
}
const EditableSelectDropdown = ({ items, placeholder, selectBoxWidth, searchBoxWidth }: EditableSelectDropdownProps) => {
  const [searchResults, setSearchResults] = useState<string[]>(items);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeIcon = <InlineSVG
        src={CloseIcon}
        className={styles.closeIcon}
        raw={true}
    />;
    useEffect(()=>{
      setSearchResults(items)
    },[items]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };
  const handleOptionClick = (value: string) => {
    setIsEditing(false);
    setSelectedValue(value);
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsEditing(false);
      setSearchTerm('');
      setSelectedValue('');
    }
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleClearItems = ()=>{
    setSearchTerm('');
  }
  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      const results = items.filter(data =>
        data.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }, 500);
    return () => clearTimeout(debouncedSearch);
  }, [searchTerm]);
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      addEventListener('mousedown', handleClickOutside);
    }
    return () => removeEventListener('mousedown', handleClickOutside);
  }, [isEditing]);
  return (
    <div className={styles.selectContainer}>
      <div className={styles.dropdownContainer}>
        <input
          className={styles.selectBox}
          name="selectItems"
          value={selectedValue}
          onChange={handleInputChange}
          onFocus={() => setIsEditing(true)}
          placeholder={placeholder}
          ref={inputRef}
          autoComplete="off"
          style={{ width: selectBoxWidth }}
        />
        {isEditing && (
          <div className={styles.dropdownContent} ref={dropdownRef} style={{ width: searchBoxWidth }}>
            <div className={styles.searchBox}>
              <input
                className={styles.filterInput}
                value={searchTerm}
                onChange={handleFilterChange}
                placeholder="Search items"
                autoComplete="off"
              />
              {searchTerm.length > 0 && <div className={styles.clearItems} onClick={handleClearItems}>{closeIcon}</div>}
            </div>
            {searchResults.length > 0 ? (
              searchResults.map((item: string) => (
                <div
                  key={item}
                  className={styles.dropdownItem}
                  onClick={() => handleOptionClick(item)}
                >
                  {item}
                </div>
              ))
            ) : (
              <div className={styles.noData}> {getIntlMessage('dropdown.NO_RESULTS')}</div>
            )}
          </div>
        )}
      </div>
      <div className={styles.verticalLine} />
      <div
        className={styles.selectArrow}
        onClick={() => setIsEditing(!isEditing)}
      />
    </div>
  );
};
export default EditableSelectDropdown;
11:40
final css - @use 'styles/constants' as *;
.selectContainer {
    display: inline-block;
    position: relative;
}
.selectContainer .selectBox {
    appearance: none;
    border: 1px solid $theme-main-color;
    border-bottom-right-radius: 27px;
    border-top-right-radius: 27px;
    cursor: pointer;
    display: inline-block;
    font-size: 13px;
    outline: none;
    padding: 4px;
    width: 350px;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    overflow: hidden !important;
}
.dropdownContainer {
    position: relative;
}
.searchBox {
    margin: 5px;
}
.clearItems {
    position: absolute;
    left: 92%;
    top: 10px;
    cursor: pointer;
}
.closeIcon {
    height: 12px;
    margin-top: 1px;
    width: 10px;
    fill: $theme-main-color;
}
.filterInput {
    border: 1px solid $theme-main-color;
    padding: 4px;
    width: 100%;
}
.noData {
    margin-bottom: 8px;
    text-align: center;
}
.dropdownContent {
    background-color: $white-color;
    border: 1px solid $theme-main-color;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    left: 0;
    max-height: 123px;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    top: 100%;
    width: 320px;
    z-index: 9999;
}
.dropdownItem {
    color: $theme-main-color;
    cursor: pointer;
    display: block;
    padding: 6px 12px;
    text-decoration: none;
}
.dropdownItem:hover {
    background-color: $curious-blue-8-color;
}
.verticalLine {
    border-left: 1px solid $theme-main-color;
    height: 28px;
    left: 91.5%;
    position: absolute;
    top: 0;
}
.selectArrow {
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid $theme-main-color;
    pointer-events: none;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}
