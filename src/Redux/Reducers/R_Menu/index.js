const initial = {
    items: [
        {
            title: 'Main Page',
            link: '/'
        },
        {
            title: 'Users',
            link: '/users'
        }
    ]
};

export default function R_Menu(state = initial, { type, payload }) {
    switch (type) {
        default:
            return state;
    }
}