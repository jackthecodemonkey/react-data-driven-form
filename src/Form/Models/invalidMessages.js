const InvalidFieldsMessage = Object.freeze({
    required: 'This field is required',
    minLength: 'Minimum length of the field is {}. You have entered {} length',
    maxLength: 'Max length of the field is {}. You have entered {} length',
    minSelect: 'Min select of the field is {}. You have {} selected',
    maxSelect: 'Max select of the field is {}. You have {} selected',
    Number: 'The field is allowed to enter only numbers',
    Decimal: 'The field is allowed to enter only decimals',
    Alphanumeric: 'The field is allowed to enter only letters and numbers',
    AlphanumericWithSpace: 'The field is allowed to enter only letters, numbers and letters',
    Email: 'The field is not valid email',
    Url: 'The field is not valid url',
})

export default InvalidFieldsMessage;
