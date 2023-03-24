import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { EntityManager, FindOneOptions, Repository } from 'typeorm';
import { events } from './event/event.constant';
import { EmailSender } from './event/event.payload';
import { StudentEntity } from './models/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    private eventEmitter: EventEmitter2,
    private readonly entityManager: EntityManager,
  ) {}

  findAll(): Observable<StudentEntity[]> {
    return from(this.studentRepository.find());
  }

  findById(id: number): Observable<StudentEntity> {
    const options: FindOneOptions<StudentEntity> = {
      where: { id },
    };
    return from(this.studentRepository.findOne(options));
  }

  create(student: StudentEntity): Observable<StudentEntity> {
    const studentEntity = from(this.studentRepository.save(student));

    const emailSender: EmailSender = {
      email: 'phanhoangkha01@gmail.com',
      content: 'Test',
    };
    // Send Event
    this.eventEmitter.emit(events.TEST_EVENT, emailSender);
    return studentEntity;
  }

  update(id: number, student: StudentEntity): Observable<StudentEntity> {
    return from(this.studentRepository.update(id, student)).pipe(
      switchMap(() => this.findById(id)),
    );
  }

  delete(id: number): Observable<void> {
    return from(this.studentRepository.delete(id)).pipe(map(() => undefined));
  }

  findAllUsingQuery(): Observable<StudentEntity[]> {
    const query = `SELECT * FROM "public"."student_entity" LIMIT $1`;
    const values = [100];
    const result = from(this.entityManager.query(query, values));
    return result;
  }
}
