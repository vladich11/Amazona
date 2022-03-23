import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Vlad',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products: [
        {

            name: 'Nike slim shirt1',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 1.5,
            numReviews: 10,
            description: 'high quality product',

        },
        {

            name: 'Nike slim shirt2',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 120,
            countInStock: 20,
            brand: 'Nike',
            rating: 2.5,
            numReviews: 10,
            description: 'high quality product',

        },

        {

            name: 'Nike slim shirt3',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 120,
            countInStock: 20,
            brand: 'Nike',
            rating: 3.5,
            numReviews: 10,
            description: 'high quality product',

        },

        {

            name: 'Nike slim shirt4',
            category: 'Shirts',
            image: '/images/p4.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Nike',
            rating: 1.5,
            numReviews: 10,
            description: 'high quality product',

        },

        {
            name: 'Nike slim shirt5',
            category: 'Shirts',
            image: '/images/p5.jpg',
            price: 120,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',

        },

        {

            name: 'Nike slim shirt6',
            category: 'Shirts',
            image: '/images/p6.jpg',
            price: 120,
            countInStock: 5,
            brand: 'Nike',
            rating: 2.5,
            numReviews: 10,
            description: 'high quality product',

        },


    ],
}

export default data;