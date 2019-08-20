import InvalidFieldContext from '../../Models/invalidContext';
import { textField3 } from '../template/mockTemplate';
import InvalidFieldsMessage from '../../Models/invalidMessages';
import rules from '../../Models/validationRule';

const validationRules = textField3.validation;

describe('InvalidFieldContext test', () => {
    it('Create instance', () => {
        const invalidFieldContext = new InvalidFieldContext(validationRules);
        expect(invalidFieldContext instanceof InvalidFieldContext).toEqual(true)
    })

    it('Shoud not create an instance', () => {
        const tmp = { ...validationRules };
        delete tmp.patternName;
        try {
            new InvalidFieldContext(tmp);
        } catch (e) {
            expect(e.message).toEqual('Custom pattern should be passed with its name.');
        }
    })

    it('IsPatternCustom property', () => {
        const invalidFieldContext = new InvalidFieldContext(validationRules);
        expect(invalidFieldContext.IsPattenCustom).toEqual(true);
    })

    it('GetInvalidContext method', () => {
        const invalidFieldContext = new InvalidFieldContext(validationRules);
        const context = invalidFieldContext.GetInvalidContext(rules.required);
        expect(context).toEqual(InvalidFieldsMessage.required);
    })

    it('GetInvalidContext method with invalid rule passed', () => {
        const invalidFieldContext = new InvalidFieldContext(validationRules);
        try {
            invalidFieldContext.GetInvalidContext('dummy');
        } catch (e) {
            expect(e.message).toEqual('dummy is not defined in the form template.');
        }
    })

    it('FindInvalidContext method with custom context', () => {
        const invalidFieldContext = new InvalidFieldContext(
            validationRules, {
                dummy: 'Dummy is invalid',
            });
        const context = invalidFieldContext.FindInvalidContext('dummy');
        expect(context).toEqual('Dummy is invalid');
    })

    it('GetPatternName method', () => {
        const tmp = { ...validationRules };
        const invalidFieldContext = new InvalidFieldContext(tmp);
        expect(invalidFieldContext.GetPatternName(invalidFieldContext.pattern)).toEqual('texReg')
        delete tmp.patternName;
        const another = new InvalidFieldContext(tmp);
        expect(another.GetPatternName(tmp.pattern)).toEqual('Alphanumeric')
    })

    it('ReplaceWith method', () => {
        const invalidFieldContext = new InvalidFieldContext(validationRules);
        const text1 = invalidFieldContext.ReplaceWith('Max select of the field is {}. You have {} selected', '{}', 'test');
        expect(text1).toEqual('Max select of the field is test. You have {} selected');
        const text2 = invalidFieldContext.ReplaceWith(text1, '{}', 'test');
        expect(text2).toEqual('Max select of the field is test. You have test selected');
    })

    it('FormatInvalidContext method', () => {
        const invalidFieldContext = new InvalidFieldContext(validationRules);
        const text = invalidFieldContext.FormatInvalidContext(InvalidFieldsMessage.maxLength, rules.maxLength, 15)
        expect(text).toEqual('Max length of the field is 10. You have entered 15 length');
    })

})