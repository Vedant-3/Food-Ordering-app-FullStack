export default function AddressInputs({addressProp,setAddressProp,disabled=false}) {
    const {phone,address,city,pincode} = addressProp ;
    return (
        <>
            <div className="flex gap-3  items-center ">
                <span className="w-[40%] font-semibold text-primary">Address:</span>
                <input  disabled={disabled} type="text" value={address} onChange={ev => setAddressProp('address',ev.target.value)} placeholder="Street Address"></input>
            </div>
            <div className="flex gap-3  items-center">
                <span className="w-[40%] font-semibold text-primary">City:</span>
                <input disabled={disabled} type="text" value={city} onChange={ev => setAddressProp('city',ev.target.value)} placeholder="Enter City"></input>

            </div>
            <div className="flex gap-3  items-center">
                <span className="w-[40%] font-semibold text-primary">Pincode:</span>
                <input disabled={disabled} type="text" value={pincode} onChange={ev => setAddressProp('pincode',ev.target.value)} placeholder="Enter PinCode"></input>
            </div>
            <div className="flex gap-3  items-center">
                <span className="w-[40%] font-semibold text-primary">Phone:</span>
                <input disabled={disabled} type="tel" value={phone} onChange={ev => setAddressProp('phone',ev.target.value)} placeholder="Enter Contact Number"></input>
            </div>
        </>
    )
}