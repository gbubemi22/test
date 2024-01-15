import { IsNotEmpty } from 'class-validator';

export class CreateTestDto {
  id?: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
