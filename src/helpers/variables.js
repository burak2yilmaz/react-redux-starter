const DEV = {
    url: {
        API_URL: 'http://localhost:3000/v1',
        PUBLIC_URL: 'http://localhost:4002',
        APP: '/qr-menu'
    },
    meta: {
        title: 'Jumbo Künefe QR Menü | Development',
        description: 'Jumbo Künefe\'nin müşterilerine özgü sunmuş olduğu QR Menü\'yü inceleyebilirsiniz.'
    }
};

const PRODUCTION = {
    url: {
        API_URL: 'https://www.jumbokunefe.com/v1',
        PUBLIC_URL: 'https://jumbokunefe.com',
        APP: '/qr-menu'
    },
    meta: {
        title: 'Jumbo Künefe QR Menü',
        description: 'Jumbo Künefe\'nin müşterilerine özgü sunmuş olduğu QR Menü\'yü inceleyebilirsiniz.'
    }
};

let variables = process.env.NODE_ENV === 'development' ? DEV : PRODUCTION;

variables.app = {
    VERSION: "V1.0.0"
};

variables.masks = {
    phone_number: "^((0?)(([1-9])([0-9]{9})))$"
};

module.exports = variables;