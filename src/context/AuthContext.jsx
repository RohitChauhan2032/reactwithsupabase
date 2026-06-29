import { createContext, useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { supabase } from "../services/Supabase";







export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
const getLogedInUserData = () => {
const {data: { subscription },} = supabase.auth.onAuthStateChange(async (event, session) => {
console.log(event);
if (session) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (error) {
    console.log(error.message);
    setUser(null);
  } else {
    setUser(data);
  }
} else {
  setUser(null);
}


});
console.log(subscription)
return subscription;
};


  // signup
  const Signup = async (name, email, phone, age, password) => {
    const { data, error } = await Supabase.auth.signUp({ name, email, phone, age, password });
    if (error) {
      console.log(error.message);
      return { data: null, error: error.message };
    } else {
      console.log(data.user);
      const {error:insertError} = await Supabase.from('users').insert({
        id: data.user.id,
      email,
      name,
      phone,
      age

      })
      if(insertError){
        console.log(insertError.message)
        return { data: null, error: insertError.message };
      }
      else{
        return { data, error: null };

      }
    }
  };

  // Login
  const Login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
 
    if (error) {
      console.log(error.message);
      return { data: null, error: error.message };
    } else {
      const { data: userData, error: userError } = await supabase.from('users').select('*').eq('id', data.user.id).single();
      if (userError) {
        console.log(userError.message);
        return { data: null, error: userError.message };
      }
      else{
        await getLogedInUserData();
        const { data, error } = await supabase.rpc("is_admin");

console.log("is_admin:", data);
console.log("error:", error);
        return { data, userData, error: null };

      }
    }

    // console.log(data.user)
  };

  // Logout
  const Logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return { error: error.message };
    } else {

      setUser(null)
      // await getLogedInUserData();
      return { error: null };
    }
  };

  useEffect(() => {
    getLogedInUserData();
  }, []);

  // console.log(user)

  return (
    <AuthContext.Provider value={{ user, Signup, Login, Logout,getLogedInUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};
