import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';

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
    referenceFields: ['age', 'name'],
    validation: {
      minLength: 3,
      maxLength: 10,
      regexp: /^\d*$/,
      required: true,
    }
  }, {
    fieldType: 'select',
    fieldName: 'state',
    label: 'State',
    referenceFields: [],
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
    referenceFields: ['state','address'],
    options: [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ],
    fetchByRefAsync: true,
    refSelector: 'state',
    validation: {
      required: false,
    }
  },
  {
    fieldType: 'select',
    fieldName: 'country',
    label: 'Country',
    referenceFields: ['suburb'],
    refSelector: 'suburb',
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
  country: 'chocolate',
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Form templates={templates} formData={formData} />
      </div>
    );
  }
}

export default App;
