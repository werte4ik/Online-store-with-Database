import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const MostViewsCards = () =>{
    const [response,setResponse] = useState()
    useEffect( ()=>{
        const coolfunvtion = async () =>{
        try{
        const allPosts = await fetch("http://127.0.0.1:8000/post/allposts",{
            headers: {
                'Content-Type': 'application/json',
            },
        method: "GET"
        })
        const data = await allPosts.json()
        setResponse(data)
    }
    catch(e){
        console.log("Pizdec " + e)
        setResponse()
    }

    }
    coolfunvtion()
}
      , [])
    const view = [0]
    if (response && response.length > 0) {
    view[0] = Math.max(...response.map(card => card.views || 0));
    }
    const mostPosts = response ? response.filter(card => {
    return (card.views || 0) >= view[0];
}) : [];
    const AddView = async (postId) => {
        console.log("Adding view for postId:", postId);
        try {
            const response = await fetch(`http://127.0.0.1:8000/posts/${postId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error adding view:", error);
        }
    };
    const retire = mostPosts.slice(0, 4).map(post => {
        return (
        <Link key={post.id} to={{pathname:`/post/${post.id}`}} className="card" onClick={() => AddView(post.id)}>
            <img src={`http://127.0.0.1:8000/Posts/${post.id}`} alt={post.title} className="cardImage"/>
            <p className="cardTitle">{post.title}</p>
            <p>{post.price}</p>
        </Link>)
    })
    return(
        <>
        <div className="cardsColumn margin">{retire}</div>
        
        </>
    )
}
export default MostViewsCards