import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestEntity } from './entities/test.entity';

@Controller('task')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTestDto: CreateTestDto) {
    const task = new TestEntity();
    task.title = createTestDto.title;
    task.description = createTestDto.description;

    return this.testService.save(task);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.testService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.testService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(id, updateTestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.testService.remove(id);
  }
}
