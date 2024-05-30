import { Injectable } from '@angular/core';
import { getDatabase, ref, push, update, remove, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Note } from '../note.model';
import { EncryptionService } from '../encryption.service';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private dbPath = '/notes';

  constructor(private encryptionService: EncryptionService) { }

  // Agregar una nueva nota
  addNote(note: Note) {
    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) return Promise.reject('User not authenticated');

    // Encriptar el contenido de la nota
    const encryptedNote = {
      ...note,
      content: this.encryptionService.encrypt(note.content),
      title: this.encryptionService.encrypt(note.title)
    };

    const notesRef = ref(db, `${this.dbPath}/${userId}`);
    return push(notesRef, encryptedNote);
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
        const decryptedNote = {
          id: key,
          ...data[key],
          content: this.encryptionService.decrypt(data[key].content),
          title: this.encryptionService.decrypt(data[key].title)
        };
        notes.push(decryptedNote);
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

    // Encriptar el contenido de la nota antes de actualizar
    const encryptedValue = {
      ...value,
      content: this.encryptionService.encrypt(value.content)
    };

    return update(ref(db, `${this.dbPath}/${userId}/${key}`), encryptedValue);
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
