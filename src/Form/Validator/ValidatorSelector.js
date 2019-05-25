import { SelectValidator } from '../Select';
import { StringValidator } from '../TextField';
import { RadioValidator } from '../Radio';
import { CheckboxValidator } from '../Checkbox';

const ValidatorSelector = ({ fieldType, validation }) => {
    let ValidationFactory = null;
    switch (fieldType) {
      case 'text':
      case 'textArea':
        ValidationFactory = StringValidator;
        break;
      case 'select':
        ValidationFactory = SelectValidator;
        break;
      case 'radio':
        ValidationFactory = RadioValidator;
        break;
      case 'checkbox':
        ValidationFactory = CheckboxValidator;
        break;
      default:
        ValidationFactory = StringValidator;
    }
    return new ValidationFactory(validation);
  }

  export default ValidatorSelector;
