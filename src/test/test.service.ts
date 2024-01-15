import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestEntity } from './entities/test.entity';
import { CreateTestDto } from './dto/create-test.dto';

@Injectable()
export class TestService {
  private tasks: TestEntity[] = [];

  async save(createTestDto: CreateTestDto): Promise<TestEntity> {
    const task = new TestEntity();
    task.title = createTestDto.title;
    task.description = createTestDto.description;
    this.tasks.push(task);
    return task;
  }

  async findAll(): Promise<TestEntity[]> {
    return [...this.tasks];
  }

  async findOne(id: string): Promise<TestEntity | undefined> {
    return this.tasks.find((task) => task.id === id);
  }

  async update(id: string, updateTestDto: UpdateTestDto): Promise<TestEntity> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }

    const task = this.tasks[taskIndex];

    // Update properties based on updateTestDto
    task.title = updateTestDto.title || task.title;
    task.description = updateTestDto.description || task.description;

    this.tasks[taskIndex] = task; // Update the task in the array

    return task;
  }

  async remove(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }

    this.tasks.splice(taskIndex, 1); // Remove the task from the array
  }
}
