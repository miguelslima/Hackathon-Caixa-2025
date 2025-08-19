import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
};

type AuthContextData = {
  user: User | null;
  signIn: (name: string) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_COLLECTION = "@simulator:users";

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogging, setIsLogging] = useState(false);

  async function signIn(name: string) {
    setIsLogging(true);

    if (!name) {
      return Alert.alert("Login", "Informe o nome para continuar.");
    }

    setIsLogging(true);

    const userData = {
      id: "1",
      name,
    };

    await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
    setUser(userData);
  }

  async function loadUserStorageData() {
    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      console.log(userData);
      setUser(userData);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
