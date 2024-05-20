export default function LabelInputBox({label,placeholder,onChange,type}){
    return <>
        <div className="m-4 w-96" >
            <label   className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">{label}</label>
            <input type={type} onChange={onChange}   id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
        
    </>
}