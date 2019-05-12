/* NOTE:: the event object needs to be wrapped with a function so that the consumer will have a separate object
 * If you just export the object only, all different Sliders on the same screen will share the same event object. */

const events = () => ({
    list: new Map(),

    on(event, callback) {
        if (!this.list.has(event)) {
            this.list.set(event, []);
        }
        this.list.get(event).push(callback);
        return this;
    },

    off(event = null) {
        this.list.delete(event);
        return this;
    },

    emit(event, ...args) {
        if (!this.list.has(event)) {
            return false;
        }
        this.list
            .get(event)
            .forEach(callback => setTimeout(() => callback.call(null, ...args), 0));
        return true;
    },
});

export default events;