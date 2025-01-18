import { Component } from '@angular/core';
import { Note, NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';
import { Category, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  notes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService
  ) {
    this.fetchNotes();
  }

  fetchNotes(): void {
    this.noteService.getActiveNotes().subscribe((data) => {
      this.notes = data;
    });
  }

  archiveNote(id: number): void {
    this.noteService.archiveNote(id).subscribe(() => {
      this.fetchNotes();
    });
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe(() => {
      this.fetchNotes();
    });
  }

  creamela() {
    let note: Note[] = [
      {
        title: 'My PRUEBA note3',
        content: 'This is the content of my PRUEBA3',
        archived: false,
      },
    ];
    let c: Category = { name: 'Mi Propia33', notes: note };

    this.categoryService.createCategory(c).subscribe({
      next: (response) => {
        console.log('Categoría creada con éxito:', response);
      },
      error: (err) => {
        console.error('Error al crear la categoría:', err);
      },
    });
    console.log('well done 11');
  }
}
