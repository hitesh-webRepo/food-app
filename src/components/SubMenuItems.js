import React from 'react'
import { motion } from 'framer-motion'

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
}

const item = {
    hidden: { x: 20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1
    }
}
const SubMenuItems = React.memo(({ data, status, title, dispatch, cart }) => {



    function handleAddtoCart(e, id) {
        const el = e.target;
        el.classList.add('clicked')
        setTimeout(() => {
            dispatch({ type: "ADD", payload: { item_id: id, quantity: 1 } })
            el.classList.remove('clicked')
        }, 1500)
    }


    return (
        <div className="overlay menu-page">
            <button className="cross-btn" onClick={e => status(false)}><i className="fas fa-times"></i></button>
            <div className="page-header">
                <h2 className="white-text">
                    {title}
                </h2>
            </div>

            <motion.div className="items-container"
                initial="hidden"
                animate="visible"
                variants={container}
            >
                {
                    data.map(({ name, image, chef, price, id }) => (
                        <motion.div className="item-card" key={id} variants={item}>
                            <motion.div className="hero"
                                animate={
                                    { rotate: 2, x: 1 }
                                }
                                transition={{ repeat: Infinity, duration: .5, repeatType: 'mirror', ease: [0.17, 0.67, 0.83, 0.67] }}
                            >
                                <img src={image} alt={name} />
                            </motion.div>
                            <div className="text-container">
                                <h3 className="white-text">{name}</h3>
                                <p>by {chef}</p>
                                <h2><i className="fas fa-rupee-sign"></i> {price}</h2>
                            </div>
                            {
                                cart.find(item => item.item_id === id) ?
                                    <div className="add-to-cart" onClick={() => dispatch({ type: "REMOVE", payload: id })}>
                                        <button className="red-button">
                                            Remove from Cart
                        </button>
                                    </div>
                                    :
                                    <div className="add-to-cart" onClick={e => handleAddtoCart(e, id)}>
                                        <button className="red-button">
                                            <span>Add to Cart</span>
                                            <i className="fas fa-shopping-cart"></i>
                                            <i className="fas fa-box"></i>
                                        </button>
                                    </div>
                            }

                        </motion.div>
                    ))
                }
            </motion.div>

        </div>
    )
})

export default SubMenuItems;
