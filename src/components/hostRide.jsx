import { Image } from 'react-bootstrap';
import './hostRide.css'
import { useEffect, useState } from 'react';


const HostRide = () => {

    const large_img = 'https://res.cloudinary.com/dzhfutnjh/image/upload/v1691383236/pexels-photo-620335_yinpls.webp'
    const small_img = 'https://res.cloudinary.com/dzhfutnjh/image/upload/v1691386474/pexels-photo-876228_rfvfyy.jpg'
    const [imageSource, setimageSource] = useState(window.innerWidth>600?large_img:small_img)

    useEffect(()=>{
        const handleResize=()=>{
            setimageSource(window.innerWidth>600?large_img:small_img)
        }
        window.addEventListener('resize',handleResize)
        return()=>{
            window.removeEventListener('resize',handleResize)
        }
    },[])

  return (
    <>
    <div className='hostImg d-flex justify-content-center m-3 '>
        <Image src={imageSource}
            className='hostImg2 rounded-3'
        />
        <div>
            
        </div>
    </div>

    </>
  )
}

export default HostRide