import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      /* 'import/no-restricted-paths': [
       'error',
       {
         zones: [
           // disables cross-feature imports:
           // eg. src/features/discussions should not import from src/features/comments, etc.
           {
             target: './src/features/auth',
             from: './src/features',
             except: ['./auth'],
           },
           {
             target: './src/features/comments',
             from: './src/features',
             except: ['./comments'],
           },
           {
             target: './src/features/discussions',
             from: './src/features',
             except: ['./discussions'],
           },
           {
             target: './src/features/teams',
             from: './src/features',
             except: ['./teams'],
           },
           {
             target: './src/features/users',
             from: './src/features',
             except: ['./users'],
           },

           // More restrictions...
         ], 
       },
     ], */
    },
  },
];


