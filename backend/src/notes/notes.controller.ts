import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
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
  create(@Body() note: Note): Promise<Note> {
    return this.notesService.create(note);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() note: Note): Promise<Note> {
    return this.notesService.update(id, note);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.notesService.delete(id);
  }

  @Patch(':id/archive')
  archive(@Param('id') id: number): Promise<Note> {
    return this.notesService.archive(id);
  }

  @Get('filterByCategory/:categoryId')
  filterByCategory(@Param('categoryId') categoryId: number): Promise<Note[]> {
    return this.notesService.filterByCategory(categoryId);
  }
}
