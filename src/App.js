import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import makeid from './Form/RandomStringGen';

const templates = [
  {
    fieldType: 'text',
    fieldName: 'name',
    label: 'Name',
    referenceFields: [],
    validation: {
      minLength: 3,
      maxLength: 10,
      regexp: /^[a-zA-Z]+$/,
      required: true,
    },
  }, {
    fieldType: 'text',
    fieldName: 'age',
    label: 'Age',
    clearIfReferenceInvalid: true,
    referenceFields: ['name'],
    validation: {
      minLength: 3,
      maxLength: 10,
      regexp: /^\d*$/,
      required: true,
    }
  }, {
    fieldType: 'text',
    fieldName: 'address',
    label: 'Address',
    referenceFields: ['age', 'name'], /* support more than one reference fields check */
    validation: {
      minLength: 3,
      maxLength: 10,
      regexp: /^\d*$/,
      required: true,
    }
  },
  {
    fieldType: 'radio',
    fieldName: 'fruit',
    label: 'Fruit',
    referenceFields: [],
    conditional: true,
    // async: true,
    // url: '/tesAPI/',
    defaultField: 'billingAddress',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'orange', label: 'Orange' },
      { value: 'watermelon', label: 'Watermelon' }
    ],
    fields: [
      {
        fieldType: 'text',
        fieldName: 'billingAddress',
        label: 'Billing Address',
        conditionalListener: 'fruit',
        show: 'orange',
        referenceFields: [],
        validation: {
          minLength: 3,
          maxLength: 10,
          regexp: /^\d*$/,
          required: true,
        }
      },
      {
        fieldType: 'text',
        fieldName: 'shippingAddress',
        label: 'Shipping Address',
        conditionalListener: 'fruit',
        show: 'watermelon',
        referenceFields: [],
        validation: {
          minLength: 3,
          maxLength: 10,
          regexp: /^\d*$/,
          required: true,
        }
      }
    ],
    validation: {
      required: true,
    }
  },

  {
    fieldType: 'checkbox',
    fieldName: 'icecream',
    label: 'Ice cream',
    referenceFields: [],
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'orange', label: 'Orange' },
      { value: 'watermelon', label: 'Watermelon' }
    ],
    validation: {
      required: true,
      // maxSelect: 2,
      // minSelect: 1,
    }
  },
  {
    fieldType: 'select',
    fieldName: 'state',
    label: 'State',
    referenceFields: [],
    // async: true,
    // url: '/tesAPI/',
    options: [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ],
    validation: {
      required: true,
    }
  }
  , {
    fieldType: 'select',
    fieldName: 'suburb',
    label: 'Suburb',
    referenceFields: ['state'],
    options: [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ],
    url: '/tesAPI/{value}/',
    fetchByRefAsync: true,
    refSelector: 'state',
    validation: {
      required: true,
      // noValidateOnMount: true,
    }
  },
  {
    fieldType: 'select',
    fieldName: 'country',
    label: 'Country',
    referenceFields: ['suburb'],
    refSelector: ['suburb'],
    url: '/country/{value}/',
    fetchByRefAsync: true,
    validation: {
      required: true,
    }
  }
]

const formData = {
  name: 'Jack',
  age: 'Age',
  state: 'vanilla',
  suburb: 'strawberry',
  country: 'chocolate',
  fruit: 'apple',
  icecream: ['apple', 'watermelon']
}

const theme = [
  {
    fieldName: "fieldName1",
    groupId: "groupId1",
    className: "fieldName1-class",
    subGroup: [
      {
        fieldName: "fieldName3",
        className: "fieldName3-class",
      },
      {
        fieldName: "fieldName4",
        className: "fieldName4-class",
      }
    ]
  },
  {
    fieldName: "fieldName2",
    groupId: "groupId1",
    className: "fieldName2-class",
    subGroup: [
      {
        fieldName: "fieldName5",
        className: "fieldName5-class",
      },
      {
        fieldName: "fieldName6",
        className: "fieldName6-class",
        subGroup: [
          {
            fieldName: "fieldName7",
            className: "fieldName7-class",
          },
        ]
      }
    ]
  },
  {
    fieldName: "fieldName12",
    className: "fieldName12-class",
    subGroup: [
      {
        fieldName: "fieldName15",
        className: "fieldName15-class",
      },
      {
        fieldName: "fieldName16",
        className: "fieldName16-class",
        subGroup: [
          {
            fieldName: "fieldName17",
            className: "fieldName17-class",
            subGroup: [
              {
                fieldName: "fieldName171",
                className: "fieldName171-class",
              },
            ]
          },
        ]
      }
    ]
  },
  {
    fieldName: "fieldName111",
    groupId: "groupId111",
    className: "fieldName111-class",
    subGroup: [
      {
        fieldName: "fieldName311",
        className: "fieldName311-class",
      },
      {
        fieldName: "fieldName411",
        className: "fieldName411-class",
      }
    ]
  },
  {
    fieldName: "fieldName211",
    groupId: "groupId111",
    className: "fieldName211-class",
    subGroup: [
      {
        fieldName: "fieldName511",
        className: "fieldName511-class",
      },
      {
        fieldName: "fieldName611",
        className: "fieldName611-class",
        subGroup: [
          {
            fieldName: "fieldName711",
            className: "fieldName711-class",
          },
        ]
      }
    ]
  }, {
    fieldName: "fieldName2111",
    groupId: "groupId111",
    className: "fieldName2111-class",
    subGroup: [
      {
        fieldName: "fieldName5111",
        className: "fieldName5111-class",
      },
      {
        fieldName: "fieldName6111",
        className: "fieldName6111-class",
        subGroup: [
          {
            fieldName: "fieldName7111",
            className: "fieldName7111-class",
          },
        ]
      }
    ]
  },
]

const createElements = (theme, initialComponent, fieldContent) => {
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
        parentProps = [parent.props.children];
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

const overrideOptions = () => {
  return {
    suburb: (value) => {
      return `api/${value}/`
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div>
          {createElements(theme, React.cloneElement(<div></div>), (field) => {
            return <span>hello</span>
          })}
        </div>
        {/* <Form
          overrideOptions={overrideOptions}
          templates={templates}
          formData={formData} /> */}
      </div>
    );
  }
}

export default App;
