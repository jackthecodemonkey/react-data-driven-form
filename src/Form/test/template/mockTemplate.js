import Pattern from '../../Models/patterns';

const textField1 = {
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
};

const textField2 = {
  fieldType: 'text',
  fieldName: 'address',
  label: 'Address',
  referenceFields: ['age', 'name'],
  validation: {
    minLength: 3,
    maxLength: 10,
    pattern: Pattern.Alphanumeric,
    required: true,
  }
};

const textField3 = {
  fieldType: 'text',
  fieldName: 'address',
  label: 'Address',
  referenceFields: ['age', 'name'],
  validation: {
    minLength: 3,
    maxLength: 10,
    pattern: /^[a-zA-Z0-9]*$/,
    patternName: 'texReg',
    required: true,
  }
};

const select1 = {
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

const select2 = {
  fieldType: 'select',
  fieldName: 'suburb',
  label: 'Suburb',
  referenceFields: ['state', 'address'],
  async: true,
  fetchByRefAsync: true,
  refSelector: 'state',
  validation: {
    required: false,
  }
}

const inValidSelect1 = {
  fieldType: 'select',
  fieldName: 'country',
  label: 'Country',
  referenceFields: ['suburb'],
  validation: {
    required: true,
  }
}

const inValidSelect2 = {
  fieldType: 'select',
  fieldName: 'country',
  label: 'Country',
  referenceFields: ['suburb'],
  refSelector: 'suburb',
  validation: {
    required: true,
  }
}

const radio1 = {
  fieldType: 'radio',
  fieldName: 'fruit',
  label: 'Fruit',
  referenceFields: [],
  options: [
    { value: 'apple', label: 'Apple' },
    { value: 'orange', label: 'Orange' },
    { value: 'watermelon', label: 'Watermelon' }
  ],
  validation: {
    required: true,
  }
};

const checkbox1 = {
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
};

const templates = [
  {
    fieldType: 'text',
    fieldName: 'name',
    label: 'Name',
    default: 'my name',
    referenceFields: [],
    validation: {
      minLength: 3,
      maxLength: 10,
      pattern: Pattern.Alphanumeric,
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
      pattern: Pattern.Alphanumeric,
      required: true,
    }
  }, {
    fieldType: 'text',
    fieldName: 'address',
    label: 'Address',
    default: 'address 1',
    referenceFields: ['age', 'name'],
    validation: {
      minLength: 3,
      maxLength: 10,
      pattern: Pattern.Alphanumeric,
      required: true,
    }
  }, {
    fieldType: 'select',
    fieldName: 'state',
    label: 'State',
    default: 'strawberry',
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
    referenceFields: ['state', 'address'],
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
  suburb: 'strawberry',
  country: 'chocolate',
  fruit: 'apple',
  icecream: ['apple', 'watermelon']
}

export {
  templates,
  textField1,
  textField2,
  textField3,
  select1,
  select2,
  radio1,
  checkbox1,
  inValidSelect1,
  inValidSelect2,
  formData,
}