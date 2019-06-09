import React, { Component } from 'react';
import makeid from './RandomStringGen';

const CreateElements = (theme, initialComponent, fieldContent) => {
    const localGroup = {};
    const renderFields = (fields, parent, isSubGroup = false) => {
      let children = [];
      for (let i = 0; i < fields.length; i++) {
        const current = fields[i];
        const { groupId = null, className = '', fieldName } = current;
        if (groupId) {
          if (!localGroup[groupId]) {
            localGroup[groupId] = React.cloneElement(
              <div></div>, {
                className: groupId,
                key: makeid()
              })
          }
        }
        const content = (fieldContent && fieldContent(fieldName)) || null;
        const currentField = React.cloneElement(
          <div></div>, {
            className,
            children: content,
            key: makeid()
          });
  
        if (current.subGroup && current.subGroup.length) {
          const subGroup = renderFields(current.subGroup, currentField, true);
          if (localGroup[groupId]) {
            let localChildren = [];
            if (localGroup[groupId].props
              && localGroup[groupId].props.children
              && localGroup[groupId].props.children.length) {
              localChildren = [...localGroup[groupId].props.children, subGroup]
            } else if (localGroup[groupId].props && localGroup[groupId].props.children) {
              localChildren = [localGroup[groupId].props.children, subGroup]
            } else {
              localChildren = subGroup
            }
            localGroup[groupId] = React.cloneElement(
              localGroup[groupId], {
                children: localChildren,
                key: makeid()
              });
          } else {
            children.push(React.cloneElement(
              <React.Fragment></React.Fragment>, {
                children: subGroup,
                key: makeid()
              }));
          }
        } else {
          if (localGroup[groupId]) {
            localGroup[groupId] = React.cloneElement(localGroup[groupId], {
              children: [...localGroup[groupId].props.children,
              currentField.props.children],
              key: makeid()
            });
          } else {
            children.push(currentField);
          }
        }
      }
  
      let parentProps = [];
      if (parent.props) {
        if (parent.props.children && parent.props.children.length) {
          parentProps = parent.props.children;
        } else {
          parentProps = parent.props.children ? [parent.props.children] : [];
        }
      }
      if (Object.keys(localGroup).length) {
        const subChildren = !isSubGroup
          ? Object.keys(localGroup).reduce((acc, next) => { return [...acc, localGroup[next]] }, [])
          : [];
        children = [
          React.cloneElement(
            <React.Fragment></React.Fragment>, {
              children: [...children], key: makeid()
            }),
          ...parentProps,
          ...subChildren
        ]
      };
      return React.cloneElement(parent, { children: children, key: makeid() });
    }
    return renderFields(theme, initialComponent);
  }

  export default CreateElements;
