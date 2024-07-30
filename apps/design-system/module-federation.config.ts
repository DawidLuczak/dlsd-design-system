import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'design-system',
  exposes: {
    './Routes': 'apps/design-system/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
