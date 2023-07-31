import React from 'react';

type ProviderProviderProps = {
  providers: Array<React.FunctionComponent<{ children: React.ReactNode }>>;
  children: React.ReactNode;
};

export function ProviderProvider({
  providers,
  children,
}: ProviderProviderProps) {
  return providers.reduce((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
}
