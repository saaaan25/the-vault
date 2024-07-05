import Image from 'next/image'
import loading from '@/public/images/cinnaloading.gif'

const LoadingPage = () => {
    return (
        <Image 
            src={loading}
            alt="loading page"
            width={500}
            height={500}
            />
    )
}
 
export default LoadingPage