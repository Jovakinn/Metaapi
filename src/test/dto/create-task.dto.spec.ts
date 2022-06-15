import { plainToInstance } from 'class-transformer';
import { CreateTaskDto } from './create-task';
import { validate } from 'class-validator';
import { Status } from '../enums/status';

describe('create-task.dto', () => {
  let dto;
  beforeAll(() => {
    dto = {
      task: '',
      tags: [],
      status: '',
    };
  });

  it('task is empty', async () => {
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('task')).toBeTruthy();
  });

  it('task is not empty', async () => {
    dto.task = 'some task';
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('task')).toBeFalsy();
  });

  it('tags are empty', async () => {
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('tags')).toBeTruthy();
    expect(dto.tags.length).toBe(0);
  });

  it('will throw an error if not all elements are strings', async () => {
    dto.tags = ['some tag', 1];
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('tags')).toBeTruthy();
    expect(dto.tags.length).not.toBe(0);
    expect(dto.tags.every((el) => typeof el === 'string')).not.toBeTruthy();
  });

  it('every element of tag is a string and array is not empty', async () => {
    dto.tags = ['some tag', '1'];
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('tags')).toBeFalsy();
  });

  it('type status is an enum value', async () => {
    dto.status = Status.ERROR;
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('status')).toBeFalsy();
    expect(dto.status).toEqual(Status.ERROR);
  });
});
