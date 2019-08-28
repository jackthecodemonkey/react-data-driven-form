import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form, { Pattern, FieldType } from './Form';

/**
 * Fields to be added
 * 1. Date time picker
 * 2. file upload
 */

/**
 *  TODO::
 *  When styling fields
 *  display validation errors
 *  0.Update models/components to show validation error by context (messages)
 *  1.Consider to show '* Required' under required fields
 *  2.Consider to show helper text under fields
 *  3.Decide default styles applied to each fields
 */

const AddressTemplate = [
  {
    fieldType: FieldType.TextField,
    fieldName: 'title',
    label: 'Title',
    default: 'Mr',
    validation: {
      maxLength: 20,
      pattern: Pattern.Number,
      noValidateOnMount: true,
    },
  }, {
    fieldType: FieldType.TextField,
    fieldName: 'address1',
    label: 'Address 1',
    default: '26 Hawkes Dr',
    referenceFields: ['title'],
    validation: {
      pattern: Pattern.Decimal,
      noValidateOnMount: true,
      required: true,
    },
  }, {
    fieldType: FieldType.TextField,
    fieldName: 'address2',
    label: 'Address 2',
    validation: {
      pattern: Pattern.Alphanumeric,
      noValidateOnMount: true,
      required: true,
    },
  },
  {
    fieldType: FieldType.TextArea,
    fieldName: 'description',
    label: 'Description',
    referenceFields: ['title', 'address2'],
    // clearIfReferenceInvalid: true, /* Clear after pristine, means initial defaule value is reserved */
    validation: {
      maxLength: 50,
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      patternName: 'Slug',
      noValidateOnMount: true,
      required: true,
    },
  },
  {
    fieldType: FieldType.Radio,
    fieldName: 'mailing',
    default: 'no',
    label: 'Would you like to get our emails ?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes', label: 'Yes' }
    ],
    validation: {
      required: true,
    }
  }, {
    fieldType: FieldType.Select,
    fieldName: 'requesttype',
    label: 'Request Type',
    default: 'studentfaul',
    options: [
      { value: 'studentfaul', label: 'Student Fault' },
      { value: 'facultyfault', label: 'Faculty Fault' },
      { value: 'stafuufault', label: 'Staff Fault' }
    ],
    validation: {
      required: true,
      noValidateOnMount: true,
    }
  }, {
    fieldType: FieldType.Checkbox,
    fieldName: 'fruits',
    label: 'Favorite Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'pear', label: 'Pear' },
      { value: 'pineapple', label: 'Pineapple' }
    ],
    validation: {
      required: true,
      minSelect: 2,
      noValidateOnMount: true,
    }
  }];

/* Structured layout */
const AddressLayout = [
  {
    groupId: 'wrapper',
    className: 'wrapper-class',
    subGroup: [
      {
        field: 'title',
        className: 'title',
      },
      {
        field: 'address1',
        className: 'address1',
      },
      {
        field: 'address2',
        className: 'address2',
      },
      {
        field: 'description',
        className: 'description',
      },
      {
        field: 'requesttype',
        className: 'requesttype',
      },
      {
        field: 'fruits',
        className: 'fruits',
      },
      {
        field: 'mailing',
        className: 'mailing',
      },
    ]
  }
]

/* unstructured layout (flatten fields) */
const AddressLayout2 = [
  {
    field: 'title',
    className: 'title',
  },
  {
    field: 'address1',
    className: 'address1',
  },
  {
    field: 'address2',
    className: 'address2',
  },
  {
    field: 'requesttype',
    className: 'requesttype',
  },
  {
    field: 'mailing',
    className: 'mailing',
  },
]

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
      pattern: Pattern.Alphanumeric,
      required: true,
    },
  },
  {
    fieldType: 'text',
    fieldName: 'age',
    label: 'Age',
    clearIfReferenceInvalid: true,
    referenceFields: ['name'],
    validation: {
      minLength: 3,
      maxLength: 10,
      pattern: Pattern.Alphanumeric,
      required: true,
    }
  },
  {
    fieldType: 'text',
    fieldName: 'address',
    label: 'Address',
    referenceFields: ['age', 'name'], /* support more than one reference fields check */
    validation: {
      minLength: 3,
      maxLength: 10,
      pattern: Pattern.Alphanumeric,
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
          pattern: Pattern.Alphanumeric,
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
          pattern: Pattern.Alphanumeric,
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
      maxSelect: 2,
      minSelect: 1,
    }
  },
  {
    fieldType: 'select',
    fieldName: 'state',
    label: 'State',
    referenceFields: [],
    async: true,
    url: '/tesAPI/',
    // options: [
    //   { value: 'chocolate', label: 'Chocolate' },
    //   { value: 'strawberry', label: 'Strawberry' },
    //   { value: 'vanilla', label: 'Vanilla' }
    // ],
    validation: {
      required: true,
    }
  },
  {
    fieldType: 'select',
    fieldName: 'suburb',
    label: 'Suburb',
    url: '/tesAPI/{value}/',
    fetchByRefAsync: true,
    refSelector: 'state',
    validation: {
      required: true,
      noValidateOnMount: true,
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
  address: 12,
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
    this.onFormChange = this.onFormChange.bind(this);
    this.state = {
      isFormValid: null,
    }
  }

  onFormChange(mergedData) {
    console.log(mergedData);
    this.setState({
      isFormValid: mergedData.isValid
    })
  }

  render() {
    return (
      <div className="App">
        <Form
          // theme={AddressLayout}
          onChange={this.onFormChange}
          // overrideOptions={overrideOptions}
          // templates={AddressTemplate}
          templates={templates}
          formData={formData}
        // formData={formData} 
        >
          <button disabled={this.state.isFormValid !== null && this.state.isFormValid !== true} >
            Submit
          </button>
        </Form>
      </div>
    );
  }
}

export default App;
