import { Link } from 'react-router-dom';

interface Props {
  darkMode: boolean;
  toggleDark: () => void;
}

export default function Home({ darkMode, toggleDark }: Props) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-4 mb-3">Gerador de Senhas</h1>
      <p className="lead mb-4">
        Gere senhas seguras com letras, números e caracteres especiais.
      </p>
      <Link to="/gerador" className="btn btn-primary btn-lg mb-3">
        Ir para o Gerador
      </Link>
      <button onClick={toggleDark} className="btn btn-outline-secondary">
        {darkMode ? 'Modo Claro ☀️' : 'Modo Escuro 🌙'}
      </button>
    </div>
  );
}
