import config from 'config';
import Firebase from 'firebase';

var FirebaseRef = new Firebase(config.FIREBASE_URL);

export default FirebaseRef;
