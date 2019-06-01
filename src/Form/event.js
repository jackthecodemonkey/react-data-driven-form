/* NOTE:: the event object needs to be wrapped with a function so that the consumer will have a separate object
 * If you just export the object only, all different Sliders on the same screen will share the same event object. */

const event = () => {
    let events = {};

    return {
        on(event, callback) {
            if (event.indexOf(':')) {
                const [eventName, eventId] = event.split(':');
                if (!events[eventName]) events[eventName] = {};
                events[eventName][eventId] = callback;
            } else {
                if (!events[event]) events[event] = new Map();
                events[event].push(callback);
            }
            return this;
        },

        off(event) {
            if (event.indexOf(':')) {
                const [eventName, eventId] = event.split(':');
                delete events[eventName][eventId];
            } else {
                events[event].delete(event);
            }
            return this;
        },

        clear() {
            events = null;
            return this;
        },

        getEvents(){
            return events;
        },

        emit(event, ...args) {
            if (!events) return;
            if (event.indexOf(':')) {
                const eventName = event.split(':')[0];
                Object.keys(events[eventName]).forEach((eventId) => {
                    setTimeout(() => events[eventName][eventId] && events[eventName][eventId].call(null, ...args), 0);
                }) 
            } else {
                events[event].forEach(callback => setTimeout(() => callback.call(null, ...args), 0));
            }
            return this;
        }
    }
}

// const events = () => ({
//     list: new Map(),

//     on(event, callback) {
//         if (!this.list.has(event)) {
//             this.list.set(event, []);
//         }
//         this.list.get(event).push(callback);
//         return this;
//     },

//     off(event = null) {
//         this.list.delete(event);
//         return this;
//     },

//     clear() {
//         this.list.clear();
//         return this;
//     },

//     emit(event, ...args) {
//         if (!this.list.has(event)) {
//             return false;
//         }
//         this.list
//             .get(event)
//             .forEach(callback => setTimeout(() => callback.call(null, ...args), 0));
//         return true;
//     },
// });

export default event;