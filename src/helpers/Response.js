import i18n from "i18next";

export const Response = {};

Response.error = code => {
    const errors = i18n.t("notifications.errors", {returnObjects: true});
    if (errors[code])
        return errors[code];
    else
        return errors[10];
};