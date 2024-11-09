import admin from 'firebase-admin'
var serviceAccount = require('@/firebase/admin/sp-ecors-db-firebase-adminsdk-lj7ji-531427e0c2.json')

const config={
  credential: admin.credential.cert(serviceAccount),
}

export const firebase_admin = admin.apps.length ? admin.app() : admin.initializeApp(config)