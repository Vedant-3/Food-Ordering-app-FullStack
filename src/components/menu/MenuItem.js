import { useContext, useState } from "react"
import { CartContext } from "../AppContext"
import toast from 'react-hot-toast'
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";
import FlyingButton from 'react-flying-item'

export default function MenuItem(menuItem) {
    const { image, name, desc, price, sizes, extra } = menuItem;
    const { addToCart } = useContext(CartContext);
    const [showPopup, setShowPopup] = useState(false);

    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);

    function handleAddToCartButtonClick() {
        const hasOptions = sizes.length > 0 || extra.length > 0;
        if (hasOptions && !showPopup) {
            setShowPopup(true);
            return;
        }
        addToCart(menuItem, selectedSize, selectedExtras);
        setTimeout(() => {
            setShowPopup(false);
        }, 600);

        toast.success("Added to Cart!!")
    }
    function handleExtras(ev, extra) {
        const checked = ev.target.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extra]);
        }
        else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name != extra.name);
            })
        }
    }

    let selectedPrice = price;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }

    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center" onClick={() => setShowPopup(false)}>
                    <div className="my-8 bg-gray-800 p-2 rounded-lg max-w-lg " onClick={ev => ev.stopPropagation()}>
                        <div className="overflow-y-scroll mb-4 max-h-[650px]" >
                            <Image src={image} alt={name} width={200} height={200} className="mx-auto" />
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">{desc}</p>
                            {sizes?.length > 0 && (
                                <div className="p-2">
                                    <h3 className="text-center italic mt-5 text-gray-700">Select Size:</h3>
                                    {sizes.map(size => (
                                        <label className="flex items-center gap-2  p-4 border rounded-md mb-1 ">
                                            <input onClick={() => setSelectedSize(size)} checked={selectedSize?.name === size.name} type="radio" name={size} />{size.name} ${price + size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {extra?.length > 0 && (
                                <div className="p-2">
                                    <h3 className="text-center italic mt-5 text-gray-700">Select Extra Toppings:</h3>
                                    {extra.map(extra => (
                                        <label className="flex items-center gap-2  p-4 border rounded-md mb-1 ">
                                            <input type="checkbox" onClick={ev => handleExtras(ev, extra)} name={extra.name} />{extra.name} +${extra.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            
                            <FlyingButton
                                targetTop={'5%'}
                                targetLeft={'80%'}
                                src={image}>
                                <div className=" primary sticky bottom-2 w-sm"
                                    onClick={handleAddToCartButtonClick}>
                                    Add to cart ${selectedPrice}
                                </div>
                            </FlyingButton>
                            <button className="mt-2 max-w-md mx-auto" onClick={() => setShowPopup(false)}>Cancel</button>
                        </div>

                    </div>
                </div>
            )}
            < MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
        </>
    )
}