import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Student } from './models/student.interface';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Get()
  findAll(): Observable<Student[]> {
    return this.studentService.findAll();
  }

  @Get('find/query')
  findAllUsingQuery(): Observable<Student[]> {
    return this.studentService.findAllUsingQuery();
  }
  @Get(':id')
  findById(@Param('id') id: number): Observable<Student> {
    return this.studentService.findById(id);
  }

  @Post()
  create(@Body() student: Student): Observable<Student> {
    return this.studentService.create(student);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() student: Student,
  ): Observable<Student> {
    return this.studentService.update(id, student);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<void> {
    return this.studentService.delete(id);
  }
}
