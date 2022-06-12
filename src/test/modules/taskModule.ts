import { Module } from '@nestjs/common';
import { TestController } from '@src/test/controller/test.controller';
import { TestService } from '@src/test/service/test.service';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestService],
})
export class TaskModule {}
