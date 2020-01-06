const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

db = admin.firestore();


exports.updatePriceOnManaChange = functions.firestore.document("OpenOrders/{orderId}/Manot/{manaId}").onUpdate((change, context) => {
    var manaAfterPrice = change.after.data().price;
    var manaBeforePrice = change.before.data().price;
    var orderRef = db.collection('OpenOrders').doc(context.params.orderId);
    return db.runTransaction(transaction => {
        return transaction.get(orderRef).then(orderDoc => {
            var newPrice = orderDoc.data().price  + manaAfterPrice - manaBeforePrice;
            return transaction.update(orderRef, {
                price: newPrice
            });
        });
    });

});

exports.updatePriceOnManaCreate = functions.firestore.document("OpenOrders/{orderId}/Manot/{manaId}").onCreate((snapshot, context) => {
    var manaPrice = snapshot.data().price;
    var orderRef = db.collection('OpenOrders').doc(context.params.orderId);
    return db.runTransaction(transaction => {
        return transaction.get(orderRef).then(orderDoc => {
            var newPrice = orderDoc.data().price  + manaPrice;
            return transaction.update(orderRef, {
                price: newPrice
            });
        });
    });

});

exports.updatePriceOnManaDelete = functions.firestore.document("OpenOrders/{orderId}/Manot/{manaId}").onDelete((snapshot,context) => {
    var manaPrice = snapshot.data().price;
    var orderRef = db.collection('OpenOrders').doc(context.params.orderId);
    return db.runTransaction(transaction => {
        return transaction.get(orderRef).then(orderDoc => {
            var newPrice = orderDoc.data().price  - manaPrice;
            return transaction.update(orderRef, {
                price: newPrice
            });
        });
    });

});