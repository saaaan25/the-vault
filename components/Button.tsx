interface ButtonProps {
    text: string
}

const Button:React.FC<ButtonProps> = ({ text }) => {
    return (
        <button className="bg-custom-color rounded-md h-[30px] w-fit px-5">
            {text}
        </button>
    )
}
 
export default Button