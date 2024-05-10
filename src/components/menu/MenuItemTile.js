import AddToCartButton from "./AddToCartButton";

export default function MenuItemTile({onAddToCart,...item}) {
    const { image, name, desc, price, sizes, extra } = item;
    const hasSizesorExtras = sizes?.length > 0 || extra?.length>0 ;
    return (
        <div className='bg-gray-200 p-2 rounded-lg  text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all h-[400px]'>
            <img src={image} alt='pizza' width={300} height={200}
                className="mx-auto"></img>
            <h4 className='font-semibold text-xl my-3'>{name}</h4>
            <p className='text-gray-500 text-sm line-clamp-3'>{desc}</p>
            <AddToCartButton
        image={image}
        hasSizesOrExtras={hasSizesorExtras}
        onClick={onAddToCart}
        basePrice={price}
      />
        </div>
    )
}