import { BrowserRouter, Routes, Router, Switch, Route, Link } from "react-router-dom";
import { IntervalProvider } from "./contexts/IntervalContext";
import { BalanceProvider } from "./contexts/BalanceContext";
import { EnergyProvider } from "./contexts/EnergyContext";
import { HappinessProvider } from "./contexts/HappinessContext";
import { RainyProvider } from "./contexts/RainyContext";
import Menu from "./routes/Menu";
import Map from "./routes/Map";
import Prambanan from './routes/Prambanan'
import Parangtritis from './routes/Parangtritis'
import Pindul from './routes/Pindul'
import Heha from './routes/HehaSky'
import Malioboro from './routes/Malioboro'
import ErrorPage from "./routes/ErrorPage";
import './App.css'

export default function App() {
  return (
    <>
      <RainyProvider>
        <IntervalProvider>
          <EnergyProvider egy={100} maxEgy={100}>
            <HappinessProvider hap={100} maxHap={100}>
              <BalanceProvider>
                <BrowserRouter basename="/explore-jogja">
                  <Routes>
                    <Route path="/" element={<Menu />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/candi-prambanan" element={<Prambanan />} />
                    <Route path="/pantai-parangtritis" element={<Parangtritis />} />
                    <Route path="/goa-pindul" element={<Pindul />} />
                    <Route path="/heha-sky-view" element={<Heha />} />
                    <Route path="/malioboro" element={<Malioboro />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </BrowserRouter>
              </BalanceProvider>
            </HappinessProvider>
          </EnergyProvider>
        </IntervalProvider>
      </RainyProvider>
    </>
  )
}