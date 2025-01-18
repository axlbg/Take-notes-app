import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from './category.service';

export interface Note {
  id?: number;
  title: string;
  content: string;
  isArchived: boolean;
  category?: Category;
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = `${environment.apiUrl}/notes`;
  private notesSubject = new BehaviorSubject<Note[]>([]);

  constructor(private http: HttpClient) {}

  get notes$(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  getActiveNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/active`).pipe(
      tap((notes) => this.notesSubject.next(notes)) // Emitir las notas activas al Subject
    );
  }

  getArchivedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/archived`).pipe(
      tap((notes) => this.notesSubject.next(notes)) // Emitir las notas archivadas al Subject
    );
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  createNote(note: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  updateNote(id: number, note: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  archiveNote(id: number): Observable<Note> {
    return this.http.patch<Note>(`${this.apiUrl}/${id}/archive`, {});
  }

  // Asignar categorías a una nota
  addCategoriesToNote(noteId: number, categoryIds: number[]): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${noteId}/categories`, {
      categories: categoryIds,
    });
  }

  // Filtrar notas por categoría
  getNotesByCategory(categoryId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  refreshNotes(actives: boolean): void {
    if (actives) this.getActiveNotes().subscribe();
    else this.getArchivedNotes().subscribe();
  }
}
