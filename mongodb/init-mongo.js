db = db.getSiblingDB('playdb')

db.createUser({
    user: "david",
    pwd: "secret",
    roles: [
        {
            role: 'readWrite',
            db: 'playdb'
        },
    ],
});

db.createCollection('products');