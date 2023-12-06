import { addToDatabase } from '@/app/myCodes/Database';
import { useEffect } from 'react';
import { useAUTHListener } from './AUTHListener';

function useLocalStorage(state, dispatch, initialCartState) {
  const user = useAUTHListener() 
  


     useEffect(() => {
    if (JSON.parse(localStorage.getItem("Cart"))) { 
      //checking if there already is a state in localstorage
      dispatch({
        type: "SAVE_CART",
        value: JSON.parse(localStorage.getItem("Cart")), 
        //if yes, update the current state with the stored one
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialCartState) {
      localStorage.setItem("Cart", JSON.stringify(state));
      if (user.uid || user.gid) addToDatabase('User', user?.uid ? user?.uid : user?.gid , 'cart', { state })
      


      //create and/or set a new localstorage variable called "state"
    }
  }, [state]);
  return (
    []
    
  )
}

export default useLocalStorage