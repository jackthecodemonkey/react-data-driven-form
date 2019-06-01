/* NOTE:: the event object needs to be wrapped with a function so that the consumer will have a separate object
 * If you just export the object only, all different Sliders on the same screen will share the same event object. */

const event = () => {
    let events = {};
    let hasKeyUsed = false;
    return {
        on(event, callback) {
            if (event.indexOf(':') > -1) {
                hasKeyUsed = true;
                const [eventName, eventId] = event.split(':');
                if (!events[eventName]) events[eventName] = {};
                events[eventName][eventId] = callback;
            } else {
                if (!events[event]) events[event] = [];
                events[event].push(callback);
            }
            return this;
        },

        off(event) {
            if (event.indexOf(':') > -1) {
                const [eventName, eventId] = event.split(':');
                delete events[eventName][eventId];
            } else {
                events[event] = [];
            }
            return this;
        },

        clear() {
            events = null;
            return this;
        },

        getEvents(eventName) {
            return eventName
            ? events[eventName]
            : events;
        },

        emit(event, ...args) {
            if (!events || !events[event]) return;
            if (hasKeyUsed) {
                Object.keys(events[event]).forEach((eventId) => {
                    setTimeout(() => events[event][eventId] && typeof events[event][eventId] === 'function' && events[event][eventId].call(null, ...args), 0);
                })
            } else {
                Object.keys(events[event]).forEach(eventName => setTimeout(() => events[event][eventName].call(null, ...args), 0));
            }

            return this;
        }
    }
}

export default event;