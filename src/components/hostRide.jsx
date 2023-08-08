// // import { Image } from 'react-bootstrap';
// // import './hostRide.css'
// // import { useEffect, useState } from 'react';


// // const HostRide = () => {

// //     const large_img = 'https://res.cloudinary.com/dzhfutnjh/image/upload/v1691383236/pexels-photo-620335_yinpls.webp'
// //     const small_img = 'https://res.cloudinary.com/dzhfutnjh/image/upload/v1691386474/pexels-photo-876228_rfvfyy.jpg'
// //     const [imageSource, setimageSource] = useState(window.innerWidth>600?large_img:small_img)

// //     useEffect(()=>{
// //         const handleResize=()=>{
// //             setimageSource(window.innerWidth>600?large_img:small_img)
// //         }
// //         window.addEventListener('resize',handleResize)
// //         return()=>{
// //             window.removeEventListener('resize',handleResize)
// //         }
// //     },[])

// //   return (
// //     <>
// //     <div className='hostImg d-flex justify-content-center m-3 '>
// //         <Image src={imageSource} className='hostImg2 rounded-3 w-100'/>
// //         <div>
// //             <input type="text" />
// //         </div>
// //     </div>

// //     </>
// //   )
// // }

// // export default HostRide


import { useEffect, useState } from 'react';
import { Image, Form, Button } from 'react-bootstrap';
import './hostRide.css';

const HostRide = () => {
  const large_img ='https://res.cloudinary.com/dzhfutnjh/image/upload/v1691391767/pexels-tobi-620335_vqjnuo.jpg';
  const small_img ='https://res.cloudinary.com/dzhfutnjh/image/upload/v1691386474/pexels-photo-876228_rfvfyy.jpg';

  const [imageSource, setImageSource] = useState(window.innerWidth > 600 ? large_img : small_img);

  useEffect(() => {
    const handleResize = () => {
      setImageSource(window.innerWidth > 600 ? large_img : small_img);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <div className='d-flex justify-content-center align-items-center'>
    <div className='hostImg d-flex justify-content-center align-items-center mx-4 m-3 position-relative'>
      <Form className='overlay-form'>
        <Form.Label>From</Form.Label>
        <Form.Control type='text' />
        <Form.Label>To</Form.Label>
        <Form.Control type='text' />
        <Form.Label>Date</Form.Label>
        <Form.Control type='date' />
        <Form.Label>Passengers</Form.Label>
        <Form.Control type='number' />
        <Button className='mt-2' type='submit'>Submit</Button>
      </Form>
      <Image src={small_img} className='hostImg2 rounded-3 w-100' />
    </div>
    </div>
    </>
  );
};

export default HostRide;
