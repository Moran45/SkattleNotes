import { Injectable } from '@angular/core';
import { getDatabase, ref, push, update, remove, onValue, child } from 'firebase/database';
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
    return push(ref(db, this.dbPath), note);
  }

  // Obtener todas las notas
  getNotes(callback: (notes: Note[]) => void) {
    const db = getDatabase();
    const notesRef = ref(db, this.dbPath);
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
    return update(ref(db, `${this.dbPath}/${key}`), value);
  }

  // Eliminar una nota
  deleteNote(key: string) {
    const db = getDatabase();
    return remove(ref(db, `${this.dbPath}/${key}`));
  }
}
