import React,{useState,useMemo, useEffect} from 'react'
import {motion} from "framer-motion"
import Homepage from './Homepage'
import Signup from './Signup'
import Popup from './Popup';
import LandingImage from './LandingImage'
import useFirestore from '../firebase/useFirestore';

export default function LandingPage({cart,dispatch,user}) {

    const [isFormOpen,setFormOpen] =  useState(false)
    const [isSignUp,setIsSignUp] =  useState(true);
    const [isPopupOpen,setIsPopupOpen] =  useState(false)
    const [searchValue,setSearchValue] =  useState("");

    const {docs} =  useFirestore("products");

    

    const searchFunc =  useMemo(() => {
        if(searchValue){

            const items =  docs.filter(doc =>{
                return Object.keys(doc).some(key=>doc[key].toString().toLowerCase().includes(searchValue.toLowerCase()))
            })
            return items
        }
        return false
        }, [searchValue])




    const variants = {
        hidden: { x: "100%" },
        visible: { x: 0},
      }

    //handling opening and closing of signup modals
    const handleFormModel =  (type)=>{
        setFormOpen(!isFormOpen);
        setIsSignUp(type)
    }

    //handle value change of search input
    const handleSearchChange =  (e)=>{
        const value  = e.target.value;
        setSearchValue(value);
    }

    return (
    <>
       <div className="landing-page">
           <div className="content-wrapper">
            <div className="text-container">
            <div className="heading-para">
            {user.id && <h3 className="normal-text">Welcome <span className="green-text">{user.email}</span>, </h3>}
            </div>
           <div className="heading-title">
               <h2 className="normal-text">
               Enjoy Quick <span className="green-text">Food</span> Delivery In SpecialOccasion.
               </h2>
           </div>
           <div className="heading-para">
               <p className="light-text">It is a long established fact that a reader will be distracted by the readable content of page when looking at the layout.</p>
           </div>
           {
           !user.id &&
           <div className="call-to-action">
               <button className="btn green-button" onClick={()=>handleFormModel(true)}>
                Sign Up
               </button>
               <button className="btn transparent-button" onClick={()=>handleFormModel(false)}>
                Log In
               </button>
           </div>
           }
           <div className="image-wrapper first">
           <motion.div className="image-container"
           initial="hidden"
           animate="visible"
           variants={variants}
           transition={{duration:.5,type:"spring"}}
           >
               {/* <img src={landingImage} alt="landing"/> */}
               <LandingImage/>
           </motion.div>
           </div>
           <div className="search-bar">
                <form>
                <input type="text" 
                name="seach-input" 
                placeholder="What are you looking for?" 
                value={searchValue} 
                onChange={handleSearchChange}
                autoComplete="off"
                />
                <button className="btn red-button" type="submit">Search</button>
               </form>
               <div className="searched-items">
    
                   {
                        searchFunc && searchFunc.map(({name,isVeg})=>(
                        <div className="searched-item" >
                            <p>{name}</p>

                            {
                                isVeg ?
                                <span className="square veg">
                                    <span className="circle"></span>
                                </span>:
                                <span className="square non-veg">
                                    <span className="circle"></span>
                                </span>
                            }
                        </div>
                        ))
                   }
               </div>

           </div>

           </div>
           <div className="image-wrapper second">
           <motion.div className="image-container"
           initial="hidden"
           animate="visible"
           variants={variants}
           transition={{duration:.5,type:"spring"}}
           >
               {/* <img src={landingImage} alt="landing"/> */}
               <LandingImage/>
           </motion.div>
           </div>
           </div>
        </div>
        <Homepage dispatch={dispatch} cart={cart}/>
        {
            isFormOpen && 
            <Signup 
            status={setFormOpen} 
            formtype={isSignUp} 
            formtypeStatus={setIsSignUp} 
            dispatch={dispatch}
            popup={setIsPopupOpen}/>
        }
        {
            isPopupOpen &&
            <Popup 
            title="Welcome" 
            message="Your favourite food is just few clicks away" 
            type="Succes"
            status={setIsPopupOpen}
            isVisible={isPopupOpen}
            />
            }
       </>
    )
}
