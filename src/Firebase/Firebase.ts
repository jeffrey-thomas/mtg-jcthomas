import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, User } from "firebase/auth";
import { useEffect, useState } from "react";

import { firebaseConfig } from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";


export namespace Firebase{
    export const app = initializeApp(firebaseConfig)
    export const auth = getAuth(app)

    export const db = getFirestore(app)

    export const signIn = async()=>{
        //Sign in through Firebase
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider).then(
            async(credential)=>{
                //window.location.reload()
            }
        )
    }

    export const signOut = async()=>{
        return auth.signOut()
    }

    export const isSignedIn = ()=>{
        return auth.currentUser !== null;
    }

    export const getToken = async()=>{
        const token = await auth.currentUser?.getIdToken()
        if(!token)
            throw new Error('Unable to get Google authentication token.')
        return token
    }

    export const useUser = ()=>{
        const [user, setUser] = useState<User|null>(null)
        useEffect(()=>{
            Firebase.auth.onAuthStateChanged(
                (user)=>{setUser(user)}
            )
        },[])
        return user
    }

    export const useAuth = ():[boolean, User |null]=>{

        const [ authorized, setAuthorized ] = useState(false)
        const [ user, setUser] = useState<User|null>(null)

        useEffect(() => {
            setUser(Firebase.auth.currentUser)
            setAuthorized(user!=null)
            Firebase.auth.onAuthStateChanged(
                (user)=>{
                    console.log('state change: '+user?.displayName)
                    setUser(user)
                    setAuthorized(Firebase.auth.currentUser!=null)
                }
            );
          }, []);
        

        return [authorized, user]
    }

}