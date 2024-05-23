import { Component, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  notes: Note[] = [];
  selectedNote: Note = { id: '', title: '', content: '' };

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.fetchNotes();
  }

  fetchNotes() {
    this.noteService.getNotes((notes) => {
      this.notes = notes;
    });
  }

  saveNote() {
    if (this.selectedNote.id) {
      this.noteService.updateNote(this.selectedNote.id, {
        title: this.selectedNote.title,
        content: this.selectedNote.content
      });
    } else {
      this.noteService.addNote({
        title: this.selectedNote.title,
        content: this.selectedNote.content,
        id: ''
      });
    }
    this.selectedNote = { id: '', title: '', content: '' }; // Reset the form
  }

  selectNote(note: Note) {
    this.selectedNote = { ...note }; // Copy the note for editing
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
  }
}
