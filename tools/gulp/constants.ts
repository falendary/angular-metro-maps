import { join } from 'path';

export const PROJECT_ROOT =  join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'packages');

export const DIST_ROOT = join(PROJECT_ROOT, 'dist');
export const DIST_COMPONENTS_ROOT = join(DIST_ROOT, 'core');
