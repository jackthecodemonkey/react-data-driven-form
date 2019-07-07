import FormDataHandler from '../FormDataHandler';
import { templates } from './template/mockTemplate';

let handler = null;

beforeEach(() => {
    handler = new FormDataHandler(templates);
})

test('FormDataHanlder test : number of templates ', () => {
    expect(handler.TotalNumberOfFields).toEqual(6);
})

test('FormDataHanlder test : default states', () => {
    expect(handler.Pristine).toEqual(false);
    expect(handler.Value).toEqual({});
    expect(handler.IsDirty).toEqual(false);
    expect(handler.IsValid).toEqual(null);
    expect(handler.MergedData).toEqual(null);
})

test('FormDataHanlder test : default values from templates', () => {
    expect(handler.DefaultValues.name).toEqual('my name');
    expect(handler.DefaultValues.address).toEqual('address 1');
    expect(handler.DefaultValues.state).toEqual('strawberry');
})