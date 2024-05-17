import NavBar from "../../componets/Navbar";
import Header from "../../componets/Header";

const Home = () => {
  return (
    <div className="w-full h-screen bg-background-two">
      <NavBar />
      <Header />
      <div className="w-full h-full flex justify-end flex-col md:flex-row px-4">
        <div className="flex-1"></div>
        <div className="flex-1 text-5xl font-bold">
          <div className="md:py-6">
            <h1>At your fingertips:</h1>
            <h1 className="py-3">A dedicated career coach</h1>
            <p className="text-xl font-medium py-2"> 
              Want to start a new dream career? Successfully build your startup?
              Itching to learn high-demand skills? Work smart with an online
              mentor by your side to offer expert advice and guidance to match
              your zeal. Become unstoppable using Bright Route.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
