import { createContext, ReactNode, useContext, useState } from 'react';

export const Context1 = createContext('default1');
export const Provider1 = ({ children }: { children: ReactNode }) => {
  return <Context1.Provider value="value1">{children}</Context1.Provider>;
};
export const Consumer1 = () => {
  const value = useContext(Context1);
  return <div>{value}</div>;
};
export const Context2 = createContext({
  value: 'default2',
  updateValue: (_: string) => {},
});
export const Provider2 = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState('value2');
  const updateValue = (value: string) => setValue(value);
  return (
    <Context2.Provider value={{ value, updateValue }}>
      {children}
    </Context2.Provider>
  );
};
export const Consumer2 = () => {
  const { value, updateValue } = useContext(Context2);
  return (
    <>
      <div>{value}</div>
      <button data-testid="button2" onClick={() => updateValue(value + '!')}>
        update value
      </button>
    </>
  );
};

export const Context3 = createContext('default3');
export const Provider3 = ({ children }: { children: ReactNode }) => {
  return <Context3.Provider value="value3">{children}</Context3.Provider>;
};
export const Consumer3 = () => {
  const value = useContext(Context3);
  return <div>{value}</div>;
};
