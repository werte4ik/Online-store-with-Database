const CreateCard = () =>{

    return(
        <section>
            <label className="auth-field">
                            <span>Username</span>
                            <input
                                type="text"
                                className="UserInput InputTypical auth-input"
                                onChange={(e)}
                                key="reg-username"
                                placeholder="Введите имя"
                            />
            </label>
        </section>
    )
}
export default CreateCard