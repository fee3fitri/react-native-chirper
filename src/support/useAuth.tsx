import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type User = {
  id: string;
  authToken: string;
};

type AuthContext = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

const Context = createContext<AuthContext | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function AuthContextProvider(props: Props) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const context = useMemo(() => ({ user, setUser }), [user]);
  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export function useAuth() {
  const context = useContext(Context);
  if (!context) {
    throw new Error(`useAuth must be used within AuthContextProvider`);
  }
  return context;
}
