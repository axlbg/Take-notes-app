import { Component, Input } from '@angular/core';
import { Note, NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-display',
  standalone: true,
  imports: [],
  templateUrl: './note-display.component.html',
  styleUrl: './note-display.component.css',
})
export class NoteDisplayComponent {
  @Input() note!: Note;

  constructor(private noteService: NoteService) {}

  archiveNote(id: number): void {
    this.noteService.archiveNote(id).subscribe(() => {
      console.log('Archived');
    });
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe(() => {
      console.log('Deleted');
    });
  }
}
