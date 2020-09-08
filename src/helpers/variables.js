const DEV = {
    url: {
        API_URL: '',
        PUBLIC_URL: 'http://localhost:4002'
    },
    meta: {
        title: 'React-Redux Boilerplate',
        description: 'React-Redux Boilerplate'
    }
};

const PRODUCTION = {
    url: {
        API_URL: '',
        PUBLIC_URL: 'http://localhost:4002'
    },
    meta: {
        title: 'React-Redux Boilerplate',
        description: 'React-Redux Boilerplate'
    }
};

const variables = process.env.NODE_ENV === 'development' ? DEV : PRODUCTION;

variables.app = {
    VERSION: "V1.0.0"
};

variables.types = {
    CORRECT_IMAGE_TYPES: [
        "image/jpg",
        "image/jpeg"
    ]
};

variables.limits = {
    IMAGE_MAX_LIMIT: 2000000,
    PROFILE_IMAGE_MAX_LIMIT: 800000
};

variables.url.APP = "/app";
variables.url.PATH = "";

variables.masks = {
    phone_number: "^((0?)(([1-9])([0-9]{9})))$"
};

export { variables }