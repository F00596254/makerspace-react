export default function Ticketbar() {

    return <>
        <div className="flex justify-center">
        <div className="flex mt-4 bg-[#4e6cf5] w-4/5 h-20 rounded-full">
            <div className="pl-8 p-3">
                <button className="bg-blue-900  hover:bg-blue-950 text-xl text-white font-medium py-3 px-6 border border-blue-700 rounded-full">
                    Submit ticket
                </button>
            </div>
            <div className="pl-4 p-3">
            <button className="bg-blue-900 hover:bg-blue-950 text-xl text-white font-medium py-3 px-6 border border-blue-700 rounded-full">
                    My tickets
                </button>
            </div>
        </div>
        </div>
    </>

}