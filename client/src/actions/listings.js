import { GET_LISTINGS } from './types';
import { db, firebase } from '../../firebase-setup'; 

const listingsRef = db.collection('listings');
const usersRef = db.collection('users');

export const createReservation = (data, cb) => async dispatch => {
    try {
        const ref = await listingsRef.add(data.info);
        data.images.forEach(async (image, i) => {
            const uri = await uploadImage(image, i, ref);
            const newData = listingsRef.doc(ref.id).update({
                images: firebase.firestore.FieldValue.arrayUnion(uri)
            });
            if (i === data.images.length - 1) {
                cb(null, newData);
            }
        });
    } catch (err) {
        console.log(err);
        cb(err);
    }
};

const uploadImage = async (image, i, ref) => {
    const base64Img = `data:image/jpg;base64,${image}`;
    const apiUrl = 'https://api.cloudinary.com/v1_1/dvt7vxvkz/image/upload';
    const data = {
        file: base64Img,
        upload_preset: 'unirooms-listings',
        folder: `listings/${ref.id}`,
    };

    try {
        let imageData = await fetch(apiUrl, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        });
        imageData = await imageData.json();
        return imageData.secure_url;
    } catch (err) {
        console.log(err);
    }
};

let first = null; 
let lastVisible = null;
const pageSize = 5;

export const getReservations = (cb) => async dispatch => {
    const listings = [];
    first = listingsRef.orderBy('date', 'desc').limit(pageSize);
    if (lastVisible) {
        first = first.startAfter(lastVisible);
    }
    
    try {
        const documentSnapshots = await first.get();
        lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        documentSnapshots.docs.forEach(async (doc, i) => {
            let data = doc.data();
            data.date = data.date.toDate();
            try {
                const user = await usersRef.doc(data.userId).get();
                data = {
                    ...data,
                    user: {
                        ...user.data(),
                        id: data.userId
                    },
                    id: doc.id
                };
                delete data.userId;
                listings.push(data);
                console.log(i);
                //console.log('last', lastVisible.data(), 'end');
                if (doc.id === lastVisible.id) {
                    dispatch({
                        type: GET_LISTINGS,
                        payload: listings
                    });
                    cb();
                }
            } catch (err) {
                console.log(err); 
                cb(err);
            }
        });
    } catch (err) {
        console.log(err); 
        cb(err); 
    }
};

// getPaged = async ({ size, start }) => {
//     let ref = this.collection.orderBy('timestamp', 'desc').limit(size);
//     try {
//       if (start) {
//         ref = ref.startAfter(start);
//       }

//       const querySnapshot = await ref.get();
//       const data = [];
//       querySnapshot.forEach(function(doc) {
//         if (doc.exists) {
//           const post = doc.data() || {};

//           // Reduce the name
//           const user = post.user || {};

//           const name = user.deviceName;
//           const reduced = {
//             key: doc.id,
//             name: (name || 'Secret Duck').trim(),
//             ...post,
//           };
//           data.push(reduced);
//         }
//       });

//       const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
//       return { data, cursor: lastVisible };
//     } catch ({ message }) {
//       alert(message);
//     }
// };
