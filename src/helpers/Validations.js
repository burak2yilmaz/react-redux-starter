export const Validations = {
    username: username => {
        return RegExp('^([a-zA-Z0-9.\-_]{8,64})$').test(username);
    },
    password: password => {
        return RegExp('^([a-zA-Z0-9.\-_]{8,64})$').test(password);
    },
    mail: mail => {
        return RegExp('^([a-z0-9\-._]+)(@)([a-z0-9\-.]+)(.)([a-z]{2,})$').test(mail);
    },
    phone: phone => {
        return RegExp('^([0-9]{10,20})$').test(phone);
    }
};