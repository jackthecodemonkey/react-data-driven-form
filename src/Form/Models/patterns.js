const Pattern = Object.freeze({
    Number: /^\d+$/,
    Decimal: /^\d*\.\d+$/,
    Alphanumeric: /^[a-zA-Z0-9]*$/,
    AlphanumericWithSpace: /^[a-zA-Z0-9 ]*$/,
    Email: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
    Url: /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#?&\/\/=]*)/ 
});

export default Pattern;