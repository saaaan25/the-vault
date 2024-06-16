interface SongModel1Props {
    song: string
}

const SongModel1:React.FC<SongModel1Props> = ({song}) => {
    return (
        <div className="
            h-[200px] 
            w-[180px] 
            rounded-lg
            bg-custom-color-2
            hover:bg-custom-color-5
            flex
            justify-center
            items-center
            mr-4
            flex-col
            mb-2
            ">
            <button className="
                    bg-custom-color-3  
                    border
                    rounded-xl 
                    border-black 
                    h-[150px] 
                    w-[150px]
                    mt-3
                    flex
                    items-center
                    justify-center
                    mb-3
                    ">
            </button>
            <div className="
                flex
                justify-center
                items-center
                ">
                <p>{song}</p>
            </div>
        </div>
    )
}
 
export default SongModel1