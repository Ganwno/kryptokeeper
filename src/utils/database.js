import firebaseConfig from '../firebase';
import { getDatabase } from 'firebase/database';

export function fetchDatabase(){
    const database = getDatabase(firebaseConfig);
    return database;
}