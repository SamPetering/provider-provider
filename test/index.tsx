import { ProviderProvider } from '@sampetering/provider-provider';
import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';

const Context1 = createContext({
  value: 'default',
  setValue: () => {},
});
const Provider1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <Context1.Provider value={{ value: 'context 1', setValue: () => {} }}>
      {children}
    </Context1.Provider>
  );
};
function Consumer1() {
  console.log('render consumer 1');
  const { value } = React.useContext(Context1);
  return <div>{value}</div>;
}
const Context2 = createContext({
  value: 'default',
  setValue: (s: string) => {},
});
const Provider2 = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = React.useState('context 2');
  const setContextValue = (v: string) => setValue(v);
  return (
    <Context2.Provider value={{ value, setValue: setContextValue }}>
      {children}
    </Context2.Provider>
  );
};
function Consumer2() {
  console.log('render consumer 2');
  const { value, setValue } = React.useContext(Context2);
  return (
    <div>
      {value}
      <button onClick={() => setValue(value + '!')}>update context 2</button>
    </div>
  );
}
const Context3 = createContext({
  value: 'default',
  setValue: () => {},
});
const Provider3 = ({ children }: { children: React.ReactNode }) => {
  return (
    <Context3.Provider value={{ value: 'context 3', setValue: () => {} }}>
      {children}
    </Context3.Provider>
  );
};
function Consumer3() {
  console.log('render consumer 3');
  const { value } = React.useContext(Context3);
  return <div>{value}</div>;
}

function TestApp() {
  return (
    <ProviderProvider providers={[Provider1, Provider2, Provider3]}>
      <Consumer1 />
      <Consumer2 />
      <Consumer3 />
    </ProviderProvider>
  );
}

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';
// Render your React component instead
const root = createRoot(document.getElementById('app')!);
root.render(<TestApp />);
