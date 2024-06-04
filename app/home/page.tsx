import Header from "@/components/Header"

export default function Home() {
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
        <></>
      </Header>
      <div className="mb-2 ml-14">
        <div className="
        flex 
        justify-between 
        items-center">
          <h1 className="
          text-black
          text-2xl
          font-bold
          ">
            Recomendados
          </h1>
        </div>
        <div>
            Lista de canciones
         </div>
      </div>
    </div>
  )
}
