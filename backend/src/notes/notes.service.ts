import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  findAllActive(): Promise<Note[]> {
    return this.notesRepository.find({ where: { isArchived: false } });
  }

  findAllArchived(): Promise<Note[]> {
    return this.notesRepository.find({ where: { isArchived: true } });
  }

  create(note: Partial<Note>): Promise<Note> {
    const newNote = this.notesRepository.create(note);
    return this.notesRepository.save(newNote);
  }

  async update(id: number, updatedNote: Partial<Note>): Promise<Note> {
    await this.notesRepository.update(id, updatedNote);
    return this.notesRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }

  async archive(id: number): Promise<Note> {
    const note = await this.notesRepository.findOneBy({ id });
    note.isArchived = !note.isArchived;
    return this.notesRepository.save(note);
  }
}
