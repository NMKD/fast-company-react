/* eslint-disable indent */
import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    selectedItem,
    valueProperty,
    contentProperty,
    onFilter
}) => {
    return (
        <>
            <ul className="list-group">
                {Array.isArray(items)
                    ? items.map((item) => (
                          <li
                              className={
                                  "list-group-item " +
                                  (selectedItem === item ? "active" : "")
                              }
                              key={item._id}
                              onClick={() => onFilter(item)}
                              role="button"
                          >
                              {item.name}
                          </li>
                      ))
                    : Object.keys(items).map((item) => (
                          <li
                              className={
                                  "list-group-item " +
                                  (selectedItem === items[item] ? "active" : "")
                              }
                              key={items[item][valueProperty]}
                              onClick={() => onFilter(items[item])}
                              role="button"
                          >
                              {items[item][contentProperty]}
                          </li>
                      ))}
            </ul>
        </>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    selectedItem: PropTypes.object,
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string,
    onFilter: PropTypes.func.isRequired
};

export default GroupList;
