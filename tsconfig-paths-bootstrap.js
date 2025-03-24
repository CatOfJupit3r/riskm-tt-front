import { register } from 'tsconfig-paths';
import tsConfig from './tsconfig.json';

const baseUrl = './dist'; // Either absolute or relative path. If relative it's resolved to current working directory.
register({
    baseUrl,
    paths: tsConfig.compilerOptions.paths,
});
