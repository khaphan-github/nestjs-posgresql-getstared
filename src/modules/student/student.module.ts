import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogerService } from './event-log.service';
import { StudentEntity } from './models/student.entity';
import { NotifyService } from './notify.service';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  providers: [StudentService, NotifyService, LogerService],
  controllers: [StudentController],
})
export class StudentModule {}
