import Image from "next/image";
import Trash from "../icons/Trash";
import { cartProductPrice } from "../AppContext";

export default function CartProduct({ product, onRemove }) {
    return (
        <div className="flex gap-4 mb-2 border-b py-2 items-center mt-5">
            <div className="w-24">
                <Image src={product.image} alt="" width={240} height={240} />
            </div>
            <div className="grow">
                <h3 className="font-semibold">{product.name}</h3>
                {product.size && (
                    <div className="text-gray-500">
                        Size: <span>{product.size.name}</span>
                    </div>
                )}
                {product.extras?.length > 0 && (
                    <div>
                        {product.extras.map(extra => (
                            <div key={extra.name} className="text-sm text-gray-500">Extra {extra.name} + ${extra.price}</div>
                        ))}
                    </div>
                )}
            </div>
            <div className="text-lg font-semibold">
                ${cartProductPrice(product)}
            </div>

            {!!onRemove && (
                <div>
                    <button type='button' onClick={() => onRemove(index)} className="px-2 w-9 ml-5 "><Trash /></button>
                </div>
            )}
        </div>
    )
}