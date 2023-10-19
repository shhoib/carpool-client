
import { Container } from "react-bootstrap"
import '../stylings/ratings.css'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import axiosInstance from "../api/axios";
import AOS from 'aos';

const Ratings = () => {

const [ratings, setRatings] = useState([])

  const USER = useSelector((state)=>state.userAuth)

  const userID = USER.userID
  // console.log(userID);

  useEffect(() => {
    AOS.init(); // Initialize AOS library
  }, []);

  useEffect(()=>{
    const fetchRatings = async()=>{
      const response = await axiosInstance.get(`/reviews?userID=${userID}`)
      // console.log(response.data.userRatings.ratings);
      setRatings(response.data.userRatings.ratings)

    }
    fetchRatings();
  },[userID])


  const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

    
  return (
    <>
    <Container>
      {ratings.length >= 0 ? (
        <>
        <div className="m-4">
          <h2 className="rating-heading m-0 text-center">YOUR RATINGS</h2>
          <hr className="hr hr-blurry w-100 m-1" />
          </div>
          {ratings.map((ratingss, index) => (
            <div data-aos="fade-up" data-aos-duration="3000" className="p-2" key={index}>
              <div className="d-flex">
                <div>
                  <div className="review-image"></div>
                </div>

                <div>
                  <div className="px-3">
                    <h3 className="reviewer-name">shuaib salam</h3>
                    <StyledRating
                      className="mx-3"
                      name="highlight-selected-only"
                      value={ratingss.ratedImogi}
                      IconContainerComponent={IconContainer}
                      readOnly
                    />
                  </div>

                  <div className="p-2">
                    <h6>{ratingss.aboutRide}</h6>
                  </div>
                </div>
              </div>
              <hr className="hr hr-blurry w-100 m-0" />
            </div>
          ))}
        </>
      ) : (
        <h6>no ratings</h6>
      )}
    </Container>
  </>

  )
}

export default Ratings