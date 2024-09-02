export function Message({ data } : {
    data : string
}) {
    return <>
        <div className="flex items-start">
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="text-sm font-normal text-gray-900 dark:text-white">     
                        {data}
                    </p>
                </div>
            </div>
        </div>      
    </>
}
