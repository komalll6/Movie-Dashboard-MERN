import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/AppContext";
import Navbar from './components/Navbar';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Global Navbar jo har page par dikhega */}
        <Navbar />
        
        {/* Aapki application ke saare routes/pages */}
        <AppRoutes />
      </div>
    </AppProvider>
  );
}

export default App;
