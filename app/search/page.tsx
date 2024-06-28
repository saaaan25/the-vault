import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header"
import SearchContent from "@/components/SearchContent";
import SearchInput from "@/components/SearchInput";

interface SearchProps {
    searchParams: {
        title: string;
    }
}

const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div className=" 
            bg-custom-color-2 
            text-black 
            h-full 
            w-full 
            overflow-hidden 
            overflow-y-auto
            ">
            <Header>
                <div className="mt-6 mb-2 flex flex-col gap-y-6">
                    <h1 className="text-black text-2xl font-bold">Buscar canciones</h1>
                    <SearchInput />
                </div>
            </Header>
            <SearchContent songs={songs} />
        </div>
    )
}

export default Search