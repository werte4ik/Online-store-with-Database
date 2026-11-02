import { Outlet } from "react-router-dom"
import Header from "./Components/Header"

const PackagePage = ()=>{
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
}
export default PackagePage