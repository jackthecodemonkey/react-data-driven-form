**Lightweight, highly configurable and easy to use data driven form renderer for React**

**Note the project is still experimental and under active development. many more new features will be added in! 🌈**

The goal of the component is to fulfil the following requirements
- Able to use the component to generate form by a template
- Able to use each field component with validation feature without a template
- Able to replace built-in component with a custum component easily

## Features
  - Generate form fields using simple template data
  - Built-in field validation
    - Default regexp patterns for input text and textarea
    - Support custom pattern validation
    - Built in validation rules for other field types such as checkbox, radio and select
  - Conditionally disable fields based on reference fields validity. ( Fields can listen each other 👀 )
  - Support separate template data for customizing layout for the form section 
    - Not only customizing each field component
    - Also have a control over styling layout the structure!
  - Get notified for form's validity, pristine, is-dirty ,invalidation text and collated form values via `onChange` event  
  - Fetch options asynchronously for select, radio and checkbox
  - Conditional field display
  
  **So far, the component supports only the following field types, but I am planning to add more widgets soon**
  
  Currently Supported field types
  
  - Input text
  - Input textarea
  - Select
  - Radio button
  - Checkbox
  
  Widgets that will be added in future versions 
  
  - Date time
  - Files drop down
  - Slide
  - and more

## API

**Form**

| Parameters  | Type | Description | Required |
| ------------------| ---------------- | ----------- | -------- |
| templates         | Array of objects | List of each field template | Yes | 
| theme             | Array of objects | Template for customizing layout for form | No |
| formData          | Object           | Initial data | No |
| onChange          | Function         | Callback to get notified whenver form fields update | Yes |
| overrideOptions   | Function         | To dynamically fetch or generate options for select, radio and checkboxes | No |

**The exmple shows how to create templates**

* Global properties ( Can be applied for every field types )

| Property  | Type | Description | Required | Default |
| ------------------| ---------------- | ----------- | -------- | -------- |
| fieldType         | String | Type of field | Yes | 
| fieldName         | String | Field name | Yes |
| label          | String           | Label | Yes |
| default          | String         | Default value | No |
| readOnly          | Boolean         | Ready only field | No | `false` |
| referenceFields   | Array or String | If specified, this field will get notified on reference fields value change event | No |
| clearIfReferenceInvalid   | Boolean | If true and reference field(s) invalid, this field value is cleared | No | `false` | 
| validation   | Object | Field validation related properties | No |

* Field specific properties

#### Radio, Select, Checkbox
| Property  | Type | Description | Required | Default |
| ------------------| ---------------- | ----------- | -------- | -------- |
| options | Array of Objects | `value` and `label` pair option | Conditional ( options passed by synchronously, Yes ) | 
| async | boolean | If we want to pass options asynchronously, this should be true  | Conditional | `False` |
| url | String | Url for fetching a list of options. If `async` or `fetchByRefAsync` true, this should not be empty. If `fetchByRefAsync` true, then expected url format is something like `/nextOptionAPI/{value}`. the value will be replaced by ref select's selected option value. Details below | Conditional |
| fetchByRefAsync | Boolean | If options for this dropdown depends on other select's selected option, set to true | Conditional|False|

