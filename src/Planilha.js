import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Lancamentos from './Lancamentos';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function Planilha() {
  const [formShow, setFormShow] = useState(false);

  const { data: lancamentos, isLoading: isLoadingList, refetch: refetchLancamentos } = useQuery({ 
    queryKey: ['lancamentos'], 
    queryFn: async () => {
      const response = await axios.get('/api/lancamento');
      return response.data;
    },
    refetchOnWindowFocus: false
  });

  const { isSuccess: isSuccessAdd, mutate: AddLancamento, isError, error } = useMutation({ mutationKey: ['addLancamento'], mutationFn: async (newLancamento) => {
    const response = await axios.post('/api/lancamento', newLancamento);
    return response.data;
  }});

  function onSubmit(valor, descricao, data) {
    setFormShow(false);
    AddLancamento({ valor, descricao, data });
  }

  useEffect(() => {
    if(isSuccessAdd)  refetchLancamentos();
  }, [isSuccessAdd]);

  return (
    <Container>
      {isError && (
        <Alert variant="danger">
          Erro ao salvar lançamento: {error?.message || 'Erro desconhecido'}
        </Alert>
      )}
      <Row>
        <Col>
          <Lancamentos
            title="Entradas"
            value={lancamentos?.filter((f) => f.valor > 0)}
          />
          { isLoadingList ? <Spinner animation="border" role="status" /> : <></> }
        </Col>
        <Col>
          <Lancamentos
            title="Saídas"
            value={lancamentos?.filter((f) => f.valor <= 0)}
          />
          { isLoadingList ? <Spinner animation="border" role="status" /> : <></> }
        </Col>
      </Row>
    </Container>
  );
}

export default Planilha;
