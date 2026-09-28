import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  // Пути к файлам из public/ относительные (см. src/lib/asset.ts),
  // чтобы собранный каталог работал не только из корня домена
  viteFinal: async (config) => ({
    ...config,
    define: { ...config.define, 'process.env.NEXT_PUBLIC_ASSET_BASE': JSON.stringify('./') },
  }),
};
export default config;
