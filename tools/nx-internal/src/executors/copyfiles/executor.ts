import { logger, PromiseExecutor } from '@nx/devkit';
import { CopyfilesExecutorSchema } from './schema';
import { copySync, watch } from 'cpx';

export const watchPromise = (options: CopyfilesExecutorSchema) =>
  new Promise<void>(() => {
    watch(options.inputPath, options.outputPath, { clean: options.clean })
      .on('copy', (e) => {
        logger.info(`Copied ${e.srcPath} to ${e.dstPath}`);
      })
      .on('remove', (e) => {
        logger.info(`Removed ${e.path}`);
      })
      .on('watch-ready', () => {
        logger.info(`Watching for changes in ${options.inputPath}`);
      })
      .on('watch-error', (err) => {
        logger.error(
          `Error watching for changes in ${options.inputPath}: ${err}`
        );
      });
  });

const runExecutor: PromiseExecutor<CopyfilesExecutorSchema> = async (
  options
) => {
  try {
    if (options.watch) {
      await watchPromise(options);
    } else {
      copySync(options.inputPath, options.outputPath, { clean: options.clean });
      logger.info(
        `Copied files from ${options.inputPath} to ${options.outputPath}`
      );
    }
    return {
      success: true,
    };
  } catch (err) {
    logger.fatal('Error copying files', err);
    return {
      success: false,
    };
  }
};

export default runExecutor;
