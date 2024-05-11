import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import Down from "../icons/Down";
import Up from "../icons/Up";
import { useState } from "react";

export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {

    const [isOpen, setIsOpen] = useState(false);

    function addSize() {
        setProps(old => {
            return [...old, { name: '', price: 0 }];
        })
    }
    function editSize(ev, index, prop) {
        const newValue = ev.target.value;
        setProps(prev => {
            const newSizes = [...prev];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }
    function removeSize(index) {
        setProps(prev => prev.filter((v, i) => i !== index));
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <div className="flex items-center gap-2">
                <button type="button" className="inline-flex border-0 justify-start " onClick={()=>setIsOpen(prev => !prev)}>
                    {isOpen && (
                        <Up />
                    )}
                    {!isOpen && (
                        <Down />
                    )}
                    <span>{name}</span>
                    <span>({props?.length})</span>
                </button>
            </div>
            <div className={isOpen ? 'block':'hidden'}>
                {props.length > 0 && props.map((size, index) => (
                    <div key={index} className="flex gap-2 items-end justify-between">
                        <div>
                            <label className="text-gray-500 font-semibold mb-10">Name</label>
                            <input className='mb-4' type="text" placeholder="Enter size" value={size.name} onChange={ev => editSize(ev, index, 'name')} />
                        </div>
                        <div>
                            <label className="text-gray-500 font-semibold mb-10">Size price</label>
                            <input type="text" placeholder="Enter price" value={size.price} onChange={ev => editSize(ev, index, 'price')} />
                        </div>
                        <div>
                            <button type="button" onClick={() => removeSize(index)} className="bg-white mb-2"><Trash /></button>
                        </div>
                    </div>

                ))}
                <button onClick={addSize} type="button" className="bg-white"> <Plus />{addLabel}</button>
            </div>
        </div>
    )
}