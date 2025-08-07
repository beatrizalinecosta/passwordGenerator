import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, InputGroup, ListGroup } from 'react-bootstrap';

interface Props {
  darkMode: boolean;
  toggleDark: () => void;
}

export default function Generator({ darkMode, toggleDark }: Props) {
  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generatePassword = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (includeLetters) charset += letters;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (!charset) {
      setPassword('Selecione ao menos uma opção');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }

    setPassword(result);
    setCopied(false);
    updateHistory(result);
  };

  const updateHistory = (newPass: string) => {
    setHistory((prev) => {
      const updated = [newPass, ...prev];
      return updated.slice(0, 5); // mantém só os últimos 5
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gerador de Senhas</h2>
        <Button variant="outline-secondary" onClick={toggleDark}>
          {darkMode ? 'Modo Claro ☀️' : 'Modo Escuro 🌙'}
        </Button>
      </div>

      <Form>
        <Form.Check
          type="checkbox"
          label="Letras maiúsculas e minúsculas"
          checked={includeLetters}
          onChange={() => setIncludeLetters(!includeLetters)}
        />
        <Form.Check
          type="checkbox"
          label="Adicionar números"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
        <Form.Check
          type="checkbox"
          label="Adicionar caracteres especiais"
          checked={includeSymbols}
          onChange={() => setIncludeSymbols(!includeSymbols)}
        />

        <Form.Group className="my-4">
          <Form.Label>Tamanho da senha: {length}</Form.Label>
          <Form.Range
            min={4}
            max={32}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Button variant="success" onClick={generatePassword} className="w-100">
              Gerar Senha
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" onClick={copyToClipboard} className="w-100">
              {copied ? 'Copiado!' : 'Copiar Senha'}
            </Button>
          </Col>
        </Row>

        <InputGroup className="mb-4">
          <Form.Control readOnly value={password} />
        </InputGroup>
      </Form>

      {history.length > 0 && (
        <div>
          <h5>Histórico de Senhas</h5>
          <ListGroup>
            {history.map((pass, i) => (
              <ListGroup.Item
                key={i}
                variant={darkMode ? 'dark' : undefined}
                className="d-flex justify-content-between align-items-center"
              >
                <span>{pass}</span>
                <Button size="sm" variant="outline-primary" onClick={() => {
                  navigator.clipboard.writeText(pass);
                  setCopied(true);
                }}>
                  Copiar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </Container>
  );
}
