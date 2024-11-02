import Data from './Data'
import './style.css'

const Navbar =()=>{
    return(
        <div>
            <div className='navbar-container'>
                <div className='navbar-brand'>DashBoard</div>
                <div className='navbar-mid'>

                <div>Home</div>
                <div>Want a Chart?</div>
                <div>Contact Us</div>
                <div>About Us</div>
                </div>
                {/* <Data/> */}
            </div>
            
        </div>
    )
}
export default Navbar