'use client'
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
    let price = cartProduct.price;
    if (cartProduct.size) {
      price += cartProduct.size.price;
    }
    if (cartProduct.extras?.length > 0) {
      for (const extra of cartProduct.extras) {
        price += extra.price;
      }
    }
    return price;
  }

export function AppProvider({children}){
    const [cartProducts,setCartProducts] = useState([]);
    const ls = typeof window !== 'undefined' ? window.localStorage : null ;

    useEffect(()=>{
        if(ls && ls.getItem('cart')){
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    },[]);

    function clearCart(){
        setCartProducts([]);
        saveCartProductsToLocalstorage([]);
    }
    function removeCartProduct(indexToRemove){
        setCartProducts(prev => {
            const newCartproducts = prev.filter((v,index)=>index !== indexToRemove);
            saveCartProductsToLocalstorage(newCartproducts);
            return newCartproducts ;
        })
    }

    function saveCartProductsToLocalstorage(cartProducts){
        if(ls){
            ls.setItem('cart',JSON.stringify(cartProducts));
        }
    }
    function addToCart(product,size=null,extras=[]){
        setCartProducts(prev => {
            const cartProduct = {...product,size,extras} ;
            const newProducts  = [...prev,cartProduct];
            saveCartProductsToLocalstorage(newProducts);
            return newProducts ;
        })
    }
    return(
        <SessionProvider>
            <CartContext.Provider value={{cartProducts,setCartProducts,addToCart,clearCart,removeCartProduct,}}>{children}</CartContext.Provider>
            {/* {children} */}
        </SessionProvider>
    )
}