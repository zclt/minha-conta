import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LancamentoForm({ onSubmit }) {
  const [formData, setFormData] = useState({});
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const valorInputRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AddLancamento({valor: formData.valor, descricao: formData.descricao, data: formData.data});
  };

  const { isSuccess: isSuccessAdd, mutate: AddLancamento, isError, error } = useMutation({ 
    mutationKey: ['createLancamento'], 
    mutationFn: async (newLancamento) => {
      const response = await axios.post('/api/lancamento', newLancamento);
      return response.data;
    }
  });

  useEffect(() => {
    setShowToast(isSuccessAdd);
  }, [isSuccessAdd]);

  useEffect(() => {
    valorInputRef.current?.focus();
  }, []);

  return (
    <>
      <Toast onClose={() => navigate("/")} show={showToast} delay={2000} autohide>
        <Toast.Body>Lançamento adicionado com sucesso!</Toast.Body>
      </Toast>
      {isError && (
        <Alert variant="danger">
          Erro ao salvar lançamento: {error?.message || 'Erro desconhecido'}
        </Alert>
      )}
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
          <Card.Header as="h5" className="bg-primary text-white">
            Novo Lançamento
          </Card.Header>
          <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formValor">
                  <Form.Label>Valor *</Form.Label>
                  <Form.Control
                    ref={valorInputRef}
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    name="valor"
                    value={formData.valor || ''}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formData">
                  <Form.Label>Data *</Form.Label>
                  <Form.Control
                    type="date"
                    name="data"
                    value={formData.data || ''}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-4" controlId="formDescricao">
              <Form.Label>Descrição *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descreva o lançamento..."
                name="descricao"
                value={formData.descricao || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={() => navigate("/")}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Salvar Lançamento
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      </div>
    </>
  );
}

export default LancamentoForm;
