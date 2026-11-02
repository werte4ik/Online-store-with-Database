const Coverinfo = (props)=>{
    const title = props.title
    const body = props.body
    return(
        <> <div className="CoverInfoGroup">
            <p className="infoCoverText">{title}</p>
            <p className="CoverunderTextBody">{body}</p>
            </div>
        </>
    )
}

export default Coverinfo