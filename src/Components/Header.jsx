import { Link } from "react-router-dom"
import UserButton from "../Img/UserButton.png"
import bucket from "../Img/bucket.png"
const Header = ()=>{
    return(
        <>
       <header>
        <Link to="/"><p className="NameCorporation">SHOP.CO</p></Link>
        <p className="HeaderText">Shop</p>
        <p className="HeaderText">On Sale</p>
        <p className="HeaderText">New Arrivals</p>
        <p className="HeaderText">Brands</p>
        <input type="text" className="FindClothes iconSearch" placeholder= "Search for products..."/>
        <div className="UserHeader">
        <img src={bucket} alt="" className="UserButtonHeader" />
        <Link to="/user"><img src={UserButton} className="UserButtonHeader" alt="Кнопка активации пользователя"/></Link>
        </div>
       </header>
        </>
    )
}
export default Header