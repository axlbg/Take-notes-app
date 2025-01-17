import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('active')
  findAllActive(): Promise<Note[]> {
    return this.notesService.findAllActive();
  }

  @Get('archived')
  findAllArchived(): Promise<Note[]> {
    return this.notesService.findAllArchived();
  }

  @Post()
  create(@Body() note: Partial<Note>): Promise<Note> {
    return this.notesService.create(note);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatedNote: Partial<Note>,
  ): Promise<Note> {
    return this.notesService.update(id, updatedNote);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.notesService.delete(id);
  }

  @Put(':id/archive')
  archive(@Param('id') id: number): Promise<Note> {
    return this.notesService.archive(id);
  }
}
