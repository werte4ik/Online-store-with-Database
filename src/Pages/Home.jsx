import Cover from "../Components/Cover"
import MostViewsCards from "../Components/MostViewsCards"
import UnderlineCompanies from "../Components/UnderlineCompanies"

const Home = ()=>{
    return(
        <>
        <section >
            <Cover/>
        </section>
        <UnderlineCompanies/>
        <section>
            <MostViewsCards/>
        </section>
        </>
    )
}
export default Home