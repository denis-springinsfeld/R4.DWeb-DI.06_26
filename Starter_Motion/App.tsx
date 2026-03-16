import Exercice0 from "./components/Exercice0";
import Exercice1 from "./components/Exercice1";
import Exercice2 from "./components/Exercice2";
import Exercice3 from "./components/Exercice3";
import Exercice4 from "./components/Exercice4";
import Exercice5 from "./components/Exercice5";
import Exercice6 from "./components/Exercice6";
import Exercice7 from "./components/Exercice7";
import Exercice8 from "./components/Exercice8";
import Exercice9 from "./components/Exercice9";
import Exercice10 from "./components/Exercice10";
import Exercice11 from "./components/Exercice11";
import Exercice12 from "./components/Exercice12";
import Exercice13 from "./components/Exercice13";

function App() {
  return (
    <div className="flex h-full min-h-screen flex-col items-center gap-10 overflow-x-clip bg-slate-950 py-20">
      <Exercice0 />

      <div className="grid w-full max-w-6xl grid-cols-1 gap-10 p-10 md:grid-cols-2 lg:grid-cols-3">
        <Exercice1 />
        <Exercice2 />
        <Exercice3 />
        <Exercice4 />
        <Exercice5 />
        <Exercice6 />
        <Exercice8 />
        <Exercice9 />
        <Exercice10 />
        <Exercice11 />
        <Exercice12 />
        <Exercice13 />
      </div>
      <Exercice7 />
    </div>
  );
}

export default App;
