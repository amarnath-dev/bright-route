import { lazy, Suspense } from "react";
import Spinner from "../../componets/fallback/Spinner";


const LazyNavBar = lazy(() => import("../../componets/navbar/Navbar"));
const LazyHeader = lazy(() => import("../../componets/header/Header"));

const Home = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyNavBar />
      <LazyHeader />
    </Suspense>
  );
};

export default Home;
