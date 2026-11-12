import { Test } from '@nestjs/testing';
import { DATABASE } from '../database/database.module';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('answers ok when the database responds', async () => {
    const database = { execute: jest.fn().mockResolvedValue({ rows: [] }) };
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: DATABASE, useValue: database }],
    }).compile();

    const controller = moduleRef.get(HealthController);

    await expect(controller.check()).resolves.toEqual({
      status: 'ok',
      database: 'up',
    });
    expect(database.execute).toHaveBeenCalledTimes(1);
  });

  it('fails when the database does not respond', async () => {
    const database = {
      execute: jest.fn().mockRejectedValue(new Error('connection refused')),
    };
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: DATABASE, useValue: database }],
    }).compile();

    const controller = moduleRef.get(HealthController);

    await expect(controller.check()).rejects.toThrow('connection refused');
  });
});
