import firebase from 'firebase/app'
import 'firebase/database'

import firebaseConfig from './config'
import IThought from '../interfaces/Thought.interface'

export const initThoughts = () => { if (!firebase.apps.length) firebase.initializeApp(firebaseConfig) }

export const readThoughts = async () => firebase.database().ref('list').once('value') 

export const writeThoughts = (thought: IThought, callback: () => void) => {
  firebase.database().ref('list').push(thought, (error: Error | null) => {
    if (error) throw new Error ("There was an error writing thoughts: " + error)
    callback()
  })
}
