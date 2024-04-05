import Form from "./Form";

const Landing = () => {
    return (
        <section>
            <div className="container mx-auto py-28">
                <div className='text-center space-y-3'>
                    <h1 className="text-white text-6xl font-extrabold">Listen to</h1>
                    <h1 className="um-gradient-text text-6xl font-extrabold">OR Download YT MP3s</h1>
                    <h1 className="text-white text-6xl font-extrabold">In Seconds</h1>
                    <h5 className="text-myGrey text-2xl">Give it a try right below, without having to sign up!</h5>
                </div>
                <Form/>
            </div>
        </section>
    )
}

export default Landing;
