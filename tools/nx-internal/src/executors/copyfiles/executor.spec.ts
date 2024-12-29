import { logger } from '@nx/devkit';
import { copySync, watch } from 'cpx';
import runExecutor, { watchPromise } from './executor';
import { CopyfilesExecutorSchema } from './schema';

jest.mock('cpx');
jest.mock('@nx/devkit', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    fatal: jest.fn(),
  },
}));

describe('runExecutor', () => {
  const options: CopyfilesExecutorSchema = {
    inputPath: 'src',
    outputPath: 'dist',
    clean: true,
    watch: false,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return success true when operation is successful', async () => {
    const result = await runExecutor(options, null);
    expect(result).toEqual({ success: true });
  });

  it('should copy files when watch is false', async () => {
    await runExecutor(options, null);
    expect(copySync).toHaveBeenCalledWith('src', 'dist', { clean: true });
    expect(logger.info).toHaveBeenCalledWith('Copied files from src to dist');
  });

  it('should watch files when watch is true', async () => {
    options.watch = true;
    const watchMock = {
      on: jest.fn().mockReturnThis(),
    };
    (watch as jest.Mock).mockReturnValue(watchMock);

    runExecutor(options, null);
    await new Promise((resolve) => setTimeout(resolve, 1));

    expect(watch).toHaveBeenCalledWith('src', 'dist', { clean: true });
    expect(watchMock.on).toHaveBeenCalledWith('copy', expect.any(Function));
    expect(watchMock.on).toHaveBeenCalledWith('remove', expect.any(Function));
    expect(watchMock.on).toHaveBeenCalledWith(
      'watch-ready',
      expect.any(Function)
    );
    expect(watchMock.on).toHaveBeenCalledWith(
      'watch-error',
      expect.any(Function)
    );
  });

  it('should return success false when operation fails', async () => {
    (copySync as jest.Mock).mockImplementation(() => {
      throw new Error('copy error');
    });
    const result = await runExecutor(options, null);
    expect(logger.fatal).toHaveBeenCalledWith(
      'Error copying files',
      expect.any(Error)
    );
    expect(result).toEqual({ success: false });
  });
});

describe('watchPromise', () => {
  const options: CopyfilesExecutorSchema = {
    inputPath: 'src',
    outputPath: 'dist',
    clean: true,
    watch: true,
  };

  it('should log appropriate messages on watch events', async () => {
    const watchMock = {
      on: jest.fn().mockReturnThis(),
    };
    (watch as jest.Mock).mockReturnValue(watchMock);

    watchPromise(options);

    const copyCallback = watchMock.on.mock.calls[0][1];
    const removeCallback = watchMock.on.mock.calls[1][1];
    const readyCallback = watchMock.on.mock.calls[2][1];
    const errorCallback = watchMock.on.mock.calls[3][1];

    copyCallback({ srcPath: 'src/file.txt', dstPath: 'dist/file.txt' });
    removeCallback({ path: 'dist/file.txt' });
    readyCallback();
    errorCallback(new Error('watch error'));

    expect(logger.info).toHaveBeenCalledWith(
      'Copied src/file.txt to dist/file.txt'
    );
    expect(logger.info).toHaveBeenCalledWith('Removed dist/file.txt');
    expect(logger.info).toHaveBeenCalledWith('Watching for changes in src');
    expect(logger.error).toHaveBeenCalledWith(
      'Error watching for changes in src: Error: watch error'
    );
  });
});
