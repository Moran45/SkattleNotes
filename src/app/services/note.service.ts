import { Injectable } from '@angular/core';
import { getDatabase, ref, push, update, remove, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Note } from '../note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private dbPath = '/notes';

  constructor() {}

  // Agregar una nueva nota
  addNote(note: Note) {
    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) return Promise.reject('User not authenticated');

    const notesRef = ref(db, `${this.dbPath}/${userId}`);
    return push(notesRef, note);
  }

  // Obtener todas las notas del usuario autenticado
  getNotes(callback: (notes: Note[]) => void) {
    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const notesRef = ref(db, `${this.dbPath}/${userId}`);
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      const notes: Note[] = [];
      for (const key in data) {
        notes.push({ id: key, ...data[key] });
      }
      callback(notes);
    });
  }

  // Actualizar una nota
  updateNote(key: string, value: any) {
    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) return Promise.reject('User not authenticated');

    return update(ref(db, `${this.dbPath}/${userId}/${key}`), value);
  }

  // Eliminar una nota
  deleteNote(key: string) {
    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) return Promise.reject('User not authenticated');

    return remove(ref(db, `${this.dbPath}/${userId}/${key}`));
  }
}
