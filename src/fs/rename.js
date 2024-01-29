import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fsPromises, { access, constants } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
const newPath = join(__dirname, 'files', 'properFilename.md');

const isExist = async (path) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
}

const rename = async () => {
  try {
    if (await isExist(newPath)) {
      throw new Error('FS operation failed');
    }
    await fsPromises.rename(oldPath, newPath);
    console.log('wrongFilename.txt was renamed to properFilename.md');
  } catch(e) {
    throw new Error ('FS operation failed');
  }
};

await rename();
