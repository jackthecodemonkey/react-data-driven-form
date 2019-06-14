import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import CreateElements from './Form/LayoutGen';
import Theme from './Form/LayoutGen/models/Theme';
import mockTheme from './Form/test/template/mockLayout';

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
]

const formData = {
  name: 'Jack',
  state: 'vanilla',
  fruit: 'apple',
  icecream: ['apple', 'watermelon']
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
        {/* {
          CreateElements(new Theme(mockTheme), (field) => {
            return <span>Hello</span>
          })
        } */}
        <Form
          overrideOptions={overrideOptions}
          templates={templates}
          formData={formData} />
      </div>
    );
  }
}

export default App;
