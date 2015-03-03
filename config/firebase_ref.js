import env from 'env';
import Firebase from 'firebase';

var FirebaseRef = new Firebase(env.FIREBASE_URL);

export default FirebaseRef;
