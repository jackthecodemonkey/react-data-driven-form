import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';

const layout = [
  {
    groupId: 'wrapper',
    className: 'wrapper-class',
    style: {
      width: '100%',
      height: '100%',
    },
    subGroup: [
      {
        groupId: 'sub-groupId-1',
        className: 'sub-groupId-1',
        subGroup: [
          {
            field: 'name',
            className: 'name',
          },
          {
            field: 'age',
            className: 'age',
            style: {
              fontSize: '14px',
            }
          },
          {
            field: 'address',
            className: 'address',
          }
        ]
      },
      {
        groupId: 'sub-groupId-2',
        className: 'sub-groupId-2',
        subGroup: [
          {
            groupId: 'sub-groupId-111',
            className: 'sub-groupId-111',
            subGroup: [
              {
                field: 'fruit',
                className: 'fruit',
              },
              {
                groupId: 'sub-groupId-3333',
                className: 'sub-groupId-3333',
                subGroup: [
                  {
                    field: 'billingAddress',
                    className: 'billingAddress',
                  },
                  {
                    field: 'shippingAddress',
                    className: 'shippingAddress',
                  },
                ]
              }
            ]
          },
          {
            field: 'icecream',
            className: 'icecream',
          },
        ]
      },
      {
        groupId: 'sub-groupId-3',
        className: 'sub-groupId-3',
        subGroup: [
          {
            field: 'state',
            className: 'state',
          },
          {
            field: 'suburb',
            className: 'suburb',
          },
          {
            field: 'country',
            className: 'country',
          }
        ]
      }
    ],
  }
]

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
  },
  // {
  //   fieldType: 'text',
  //   fieldName: 'age',
  //   label: 'Age',
  //   clearIfReferenceInvalid: true,
  //   referenceFields: ['name'],
  //   validation: {
  //     minLength: 3,
  //     maxLength: 10,
  //     regexp: /^\d*$/,
  //     required: true,
  //   }
  // }, 
  // {
  //   fieldType: 'text',
  //   fieldName: 'address',
  //   label: 'Address',
  //   referenceFields: ['age', 'name'], /* support more than one reference fields check */
  //   validation: {
  //     minLength: 3,
  //     maxLength: 10,
  //     regexp: /^\d*$/,
  //     required: true,
  //   }
  // },
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
  // {
  //   fieldType: 'checkbox',
  //   fieldName: 'icecream',
  //   label: 'Ice cream',
  //   referenceFields: [],
  //   options: [
  //     { value: 'apple', label: 'Apple' },
  //     { value: 'orange', label: 'Orange' },
  //     { value: 'watermelon', label: 'Watermelon' }
  //   ],
  //   validation: {
  //     required: true,
  //     // maxSelect: 2,
  //     // minSelect: 1,
  //   }
  // },
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
  },
  // {
  //   fieldType: 'select',
  //   fieldName: 'suburb',
  //   label: 'Suburb',
  //   referenceFields: ['state'],
  //   options: [
  //     { value: 'chocolate', label: 'Chocolate' },
  //     { value: 'strawberry', label: 'Strawberry' },
  //     { value: 'vanilla', label: 'Vanilla' }
  //   ],
  //   url: '/tesAPI/{value}/',
  //   fetchByRefAsync: true,
  //   refSelector: 'state',
  //   validation: {
  //     required: true,
  //     // noValidateOnMount: true,
  //   }
  // },
  // {
  //   fieldType: 'select',
  //   fieldName: 'country',
  //   label: 'Country',
  //   referenceFields: ['suburb'],
  //   refSelector: ['suburb'],
  //   url: '/country/{value}/',
  //   fetchByRefAsync: true,
  //   validation: {
  //     required: true,
  //   }
  // }
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

// const overrideOptions = () => {
//   return {
//     suburb: (value) => {
//       return `api/${value}/`
//     }
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Form
          theme={layout}
          // overrideOptions={overrideOptions}
          templates={templates}
          formData={formData} />
      </div>
    );
  }
}

export default App;
