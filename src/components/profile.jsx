import { Container } from "react-bootstrap"


const Profile = () => {
    const containerStyle = {
        width: '300px',
        height: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // backgroundImage: selectedImage ? `url(${selectedImage})` : 'none',
      };
    

  return (
    <>
    <Container>
        <h1>SHOIB</h1>
        <div>
      <h2>Profile</h2>
      <div>
        <input type="file" accept="image/*" onChange={(e) => handleImageDrop(e.target.files)} />
      </div>
      <div style={containerStyle}></div>
    </div>
    </Container>
    </>
  )
}

export default Profile