// import { Image } from 'react-bootstrap';
// import '../style.css';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import { Row, Col,Carousel } from 'react-bootstrap';
// import { IoCarSportOutline } from 'react-icons/io5';
// import { PiUsersThreeDuotone } from 'react-icons/pi';
// import { GiRoad } from 'react-icons/gi';
// // import axios from '../api/axios';
// // import { useState } from 'react';
// // import { useEffect } from 'reac  t';
// import { useSelector } from 'react-redux';



// const Home = () => {

 
//   const userr = useSelector((state)=>state.userAuth) 


//   return (
//     <>
//       <Row className="d-flex  align-items-center justify-content-center mt-4">
//       <Col xs={12} md={7}>
//         <h1 className=" text-center maintxt m-3">
//           pooling resources, sharing journeys, fostering community
//         </h1>
//         <div className='d-flex'>
//           <Col xs={5} className='text-center m-2 m-4'>
//           <h5 className='h-six-tags'>Travel at low prices</h5>
//           <p>Wherever you’re going, there’s a carpool that will get you there for less.</p>
//           </Col>
//           <div className='vertical-line'></div>
//           <Col xs={4} className='text-center m-2 mt-4'>
//           <h5 className='h-six-tags'>Trustworthy and simple</h5>
//           <p>We check reviews, profiles and IDs, so you know who you’re travelling with; and
//            our app is both simple and secure thanks to powerful technology.</p>
//            </Col>
//         </div>
//         </Col>
//         <Col xs={12} md={5}>
//         <Image
//           src="https://res.cloudinary.com/dzhfutnjh/image/upload/v1689223537/teens-driving_hsyzf6.jpg"
//           className="poolingImage rounded-4 mx-5 my-5"
//           alt="My Image"/>
//           </Col>
//       </Row>

//       <div className='d-flex flex-wrap align-items-center justify-content-evenly  homeCard p-5 mt-4'>
//       <Card className="bg-dark text-white joinImg m-sm-3">
//        <Card.Img className='afraid-Image' src="https://res.cloudinary.com/dzhfutnjh/image/upload/v1689233415/pexels-photo-5065216_rvw3bf.jpg" alt="Card image" />
//            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
//              <Card.Title className="text-center mt-5 "><h2>Join a ride</h2></Card.Title>
//                <div className="mt-auto text-center">
//                <Button variant="primary mb-3" >Join</Button>
//            </div>
//          </Card.ImgOverlay>
//         </Card>

//       <Card className="bg-dark text-white joinImg">
//       <Card.Img className='afraid-Image' src="https://res.cloudinary.com/dzhfutnjh/image/upload/v1689233498/pexels-photo-376729_nhxvdl.webp" alt="Card image" />
//       <Card.ImgOverlay className='d-flex flex-column justify-content-end '>
//         <Card.Title className="text-center mt-5 "><h2>Host a ride</h2></Card.Title>
//         <div className="mt-auto text-center">
//       <Button variant="primary mb-3">Host</Button>
//     </div>
//       </Card.ImgOverlay>
//     </Card>
//       </div>

//       <Row className="align-items-center justify-content-center">
//   <Col xs={12} md={6} className="text-md-right">
//     <Image
//       className="img-fluid afraid-Image"
//       src="https://res.cloudinary.com/dzhfutnjh/image/upload/v1689386731/istockphoto-1279422031-170667a_pxpl5y.jpg"
//     />
//   </Col>
//   <Col xs={12} md={6} className="text-md-left">
//     <h2 className="mt-3">
//       Afraid to hoist/join a ride, read hoster/passenger review to ensure your safety and kindly rate your companion after the ride.
//     </h2>
//   </Col>
// </Row>

//  <div className=" d-none d-md-block mt-4 ">
//     <hr className="horizontal-line rounded" />
//   </div>

// <Row className="justify-content-evenly">
//   <Col xs={12} md={5} className="howToDiv rounded-3 p-3 my-5">
//     <h4 className="howtotxt text-center">How to publish a ride</h4>
//     <p className="howtotxt">Click on the host button and provide your details.</p>
//   </Col>
//   <Col xs={12} md={5} className="howToDiv rounded-3 p-3 my-5">
//     <h4 className="howtotxt text-center">How to join a ride</h4>
//     <p className="howtotxt">Click on the join button, provide your current location and destination, and select your desired ride.</p>
//   </Col>
// </Row>

// <Carousel fade>
// <Carousel.Item>
//     <div className="carousel-item-container">
//       <div className="reviewer-image-container">
//         <img
//           className="reviewer-image"
//           src="https://res.cloudinary.com/dzhfutnjh/image/upload/v1689395948/1940c9bb-0b9d-4440-92b5-c03c6353926c_kxiuzp.jpg"
//           alt="Reviewer"
//         />
//       </div>
//       <div className="review-content">
//         <p className="review-text">
//          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.
//         </p>
//       </div>
//     </div>
//   </Carousel.Item>

// <Carousel.Item>
//     <div className="carousel-item-container">
//       <div className="reviewer-image-container">
//         <img
//           className="reviewer-image"
//           src="https://res.cloudinary.com/dzhfutnjh/image/upload/v1689395948/1940c9bb-0b9d-4440-92b5-c03c6353926c_kxiuzp.jpg"
//           alt="Reviewer"
//         />
//       </div>
//       <div className="review-content">
//         <p className="review-text">
//           bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.
//         </p>
//       </div>
//     </div>
//   </Carousel.Item>
  
// <Carousel.Item>
//     <div className="carousel-item-container">
//       <div className="reviewer-image-container">
//         <img
//           className="reviewer-image"
//           src="https://res.cloudinary.com/dzhfutnjh/image/upload/v1689395948/1940c9bb-0b9d-4440-92b5-c03c6353926c_kxiuzp.jpg"
//           alt="Reviewer"
//         />
//       </div>
//       <div className="review-content">
//         <p className="review-text">
//           ccccccccccccccccccccccccccccccc.
//         </p>
//       </div>
//     </div>
//   </Carousel.Item>   
//     </Carousel>

//   <div className='d-flex flex-wrap justify-content-around text-center'>
//    <div className='icons'>
//     <IoCarSportOutline/>
//     <h5>100 shared rides</h5>
//     </div>

//    <div className='icons'>
//     <PiUsersThreeDuotone />
//     <h5>over 500 users</h5>
//     </div>

//    <div className='icons'>
//     <GiRoad />
//     <h5>over 1000 kms shared</h5>
//     </div>
// </div>
      
//     </>
//   );
// };

// export default Home;



import {Container,Row, Col} from 'react-bootstrap';
import '../stylings/homepage.css'
import { MDBCard, MDBCardTitle,MDBBtn, MDBCardOverlay} from 'mdb-react-ui-kit';
import Lottie from 'react-lottie'
import hostRide from '../animations/hostRide.json'
import joinRide from '../animations/joinRide.json'
import {BiSolidCarGarage} from 'react-icons/bi'
import {PiUsersThreeDuotone} from 'react-icons/pi'
import {IoCarSportOutline} from 'react-icons/io5'
import {GiRoad} from 'react-icons/gi'




const Home = () => {

  const hostRideOptions = {
    loop: true,
    autoplay: true,
    animationData: hostRide,
  };
  const JoinRideOptions = {
    loop: true,
    autoplay: true,
    animationData: joinRide,
  };

  return (
    <>
    <Row >
      <Container className='d-flex position-relative'>
        <div className='text-container'>
          <h1 className='text-center m-3'>
            pooling resources, sharing journeys, fostering community
          </h1>
        </div>
        <div className='second-text-container'>
        <h2><BiSolidCarGarage/></h2>
          <h5>Wherever you’re going, there’s a carpool that will get you there for less.</h5>
        </div>
        <img
          className='gif'
          src='https://res.cloudinary.com/dzhfutnjh/image/upload/v1696831969/4-scene_3_i1l0ko.gif'
          alt=''
        />
      </Container>
    </Row>

    <Row className='host-join-animation-container d-flex align-items-around justify-content-around' >
    <Col md={6} xs={12} className='d-flex justify-content-center p-4'>
      <MDBCard alignment='center' background='dark' className='custom-card text-white'>
        <Lottie options={hostRideOptions} />
        <MDBCardOverlay>
          <MDBCardTitle><h5>Ready to Host a Ride</h5></MDBCardTitle> 
          <MDBBtn>Host Ride</MDBBtn>
        </MDBCardOverlay>
      </MDBCard>
      </Col>

    <Col md={6} xs={12} className='d-flex justify-content-center p-4'>
      <MDBCard alignment='center' background='dark' className='custom-card' style={{color:'grey'}}>
        <Lottie className = 'w-100' options={JoinRideOptions} />
        <MDBCardOverlay>
          <MDBCardTitle>Excited to Join Ride </MDBCardTitle> 
          <MDBBtn>Join Ride</MDBBtn>
        </MDBCardOverlay>
      </MDBCard>
      </Col>
    </Row>

     <div className='d-flex flex-wrap justify-content-around text-center'>
    <div className='icons'>
     <IoCarSportOutline/>
     <h5>100 shared rides</h5>
     </div>

    <div className='icons'>
     <PiUsersThreeDuotone />
     <h5>over 500 users</h5>
     </div>

    <div className='icons'>
     <GiRoad />
     <h5>over 1000 kms shared</h5>
     </div>
     </div>
    </>
  );
};

export default Home;

