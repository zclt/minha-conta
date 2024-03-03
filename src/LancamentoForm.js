import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LancamentoForm({ onSubmit }) {
  const [formData, setFormData] = useState({});
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AddLancamento({valor: formData.valor, descricao: formData.descricao, data: formData.data});
  };

  const { isSuccess: isSuccessAdd, mutate: AddLancamento, variables } = useMutation('lancamento', async () => {
    if(variables)
      await axios.post('/Lancamento', variables);
  });

  useEffect(() => {
    setShowToast(isSuccessAdd);
  }, [isSuccessAdd]);

  return (
    <>
      <Toast onClose={() => navigate("/")} show={showToast} delay={2000} autohide>
        <Toast.Body>Lançamento adicionado com sucesso!</Toast.Body>
      </Toast>
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group className="mb-3" controlId="formValor">
          <Form.Label>Valor</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o valor..."
            name="valor"
            value={formData.valor}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a descrição..."
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formData">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="date"
            name="data"
            value={formData.data}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form>
    </>
  );
}

export default LancamentoForm;
