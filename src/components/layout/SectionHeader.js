export default function SectionHeaders({subHeader,mainHeader}){
    return(
        <div>
            <h3 className="uppercase text-gray-500 font-semibold">{subHeader}</h3>
            <h2 className="text-primary font-bold text-4xl italic ">{mainHeader}</h2>
        </div>
    )
}