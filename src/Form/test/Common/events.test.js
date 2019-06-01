import events from '../../event';

let event = null;

const event1 = 'onChange:123';
const event2 = 'onChange:345';
const event3 = 'onChange:678';

const dummyCallback = (done) => {
    let count = 3;
    return () => {
        --count;
        if(count === 0){
            done();
        }
    }
}

beforeEach(() => {
    event = events();
    event.on(event1, (testResult) => { return testResult() });
    event.on(event2, (testResult) => { return testResult() });
    event.on(event3, (testResult) => { return testResult() });
})

test('Events should be registered with unique keys', () => {
    expect(Object.keys(event.getEvents('onChange')).length).toEqual(3);
});

test('Events should delete events with event keys', () => {
    event.off(event1);
    event.off(event3);
    expect(Object.keys(event.getEvents('onChange')).length).toEqual(1);
    expect(typeof event.getEvents('onChange')['345']).toEqual('function');
});

test('Events should fire registered events', (done) => {
    event.off(event1);
    event.off(event2);
    event.off(event3);
    event.on(event1, (testResult) => {  testResult();  });
    event.on(event2, (testResult) => {  testResult(); });
    event.on(event3, (testResult) => {  testResult(); });
    event.emit('onChange',dummyCallback(done));
});

test('Events should override exisitng events', (done) => {
    event.off(event1)
    event.off(event3)
    event.on(event2, (testResult) => {  expect(testResult).toEqual('test'); done(); }); 
    event.emit('onChange','test')
});

test('Events can be cleared at once', () => {
    event.clear();
    expect(event.getEvents()).toEqual(null);
});

