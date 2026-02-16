export default function Login(){
    return(
        <>
        <h1>Login</h1>
        <form>
            <div>
                <label for="userName">Enter a Username</label>
                <input type="text" id="userName" name="userName" placeholder="Username"></input>
            </div>
            <div>
                <label for="password">Enter a Password</label>
                <input type="password" id="password" name="password" placeholder="Password"></input>
            </div>
            <div>
                <input type="submit" value="submit"></input>
            </div>
        </form>
        <button type="submit">Sign Up</button>
        </>
    );
}