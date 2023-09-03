import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";

export interface IUser {
  id: number;
  name: string;
  login: string;
}

const initValues: IUser = { id: 0, name: "search", login: "" };

const useUserImpl = () => {
  const [user, _setUser] = useState<IUser>(initValues);
  const setUser = useCallback((newValue: IUser) => {
    // console.log("change to:", newValue);
    _setUser(newValue);
  }, []);

  //   useEffect(() => {
  //     if (!me)    {
  //         console.log('not settings')
  //     }
  //   }, [me]);

  //   useEffect(() => {
  //         console.log('first load')
  //   }, []);

  useEffect(() => {
    console.log("pass here useUser Effect");
  });



  const getNewUser = async (login: string) => {
    try {
      const result = await axios.get(`https://api.github.com/users/${login}`);
      if (result.data) {
        // const { name, id, login } = result.data;
        console.log(result.data)
        setUser(result.data);
        return;
      }

      setUser(initValues);
    } catch (error) {
      console.log("error", error);
      setUser(initValues);
    }
  };

  const nameLenght =`${user.name.length} caracteres in name`;

  return {
     user,
    getNewLogin: getNewUser,
    nameLenght,
  };
};

export const useUser = singletonHook(initValues, useUserImpl);
