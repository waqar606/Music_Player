import Form from "./Form";

const Landing = () => {
    return (
        <section>
            <div className="container mx-auto py-28">
                <div className='text-center space-y-3 px-3  md:px-0'>
                    <h1 className="text-white text-3xl md:text-6xl font-extrabold">Listen to</h1>
                    <h1 className="um-gradient-text text-3xl md:text-6xl font-extrabold">OR Download YT MP3s or MP4s</h1>
                    <h1 className="text-white text-3xl md:text-6xl font-extrabold">In Seconds</h1>
                    <h5 className="text-myGrey md:text-2xl">Give it a try right below, without having to sign up!</h5>
                </div>
                <div className="mt-24">
                <Form value={""}/>
                </div>
            </div>
        </section>
        
    )
}

export default Landing;
