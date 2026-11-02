import Couple from "../Img/trendy-fashionable-couple-posing.jpg"
import Coverinfo from "./coverinfo"
import UnderlineCompanies from "./UnderlineCompanies"
const Cover = () =>{
    return(
        
        <div className="CoverPage">
            <div className="ImageWrapper"><img src={Couple} alt="" className="CouplePosing"/></div>
            <div className="margin">
                <p className="CoverText">FIND CLOTHES THAT MATCHES YOUR STYLE</p>
                <p className="CoverunderText">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                <button className="ShopButton">Shop Now</button>
                <div className="info">
                    <Coverinfo title = "200+" body = "International Brands"/>
                    <div className="stick"></div>
                    <Coverinfo title = "2,000+" body = "High-Quality Products"/>
                    <div className="stick"></div>
                    <Coverinfo title = "30,000+" body = "Happy Customers"/>
                </div>
            </div>
        </div>
    )
}

export default Cover