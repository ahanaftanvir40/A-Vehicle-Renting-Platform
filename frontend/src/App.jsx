import "./App.css";
import { Footer, Header } from "./components";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div className="dark:bg-[#1c2127] bg-[#6768ab]">
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
