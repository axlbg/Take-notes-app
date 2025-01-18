import { Component } from '@angular/core';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteDisplayComponent } from './components/note-display/note-display.component';
import { Note } from './services/note.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NoteFormComponent, NoteListComponent, NoteDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  note!: Note;

  onNoteSelected(note: Note) {
    this.note = note;
  }
}
