import { BrowserRouter, Routes, Route } from "react-router-dom";
import Planilha from './Planilha';
import './style.css';
import Layout from './Layout';
import NoPage from './NoPage';
import LancamentoForm from './LancamentoForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Planilha />} />
          <Route path="form-lancamento" element={<LancamentoForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
