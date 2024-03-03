import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Lancamentos from './Lancamentos';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Planilha() {
  const [formShow, setFormShow] = useState(false);

  const { data: lancamentos, isLoading: isLoadingList, refetch: refetchLancamentos } = useQuery('lancamentos', async () => {
    const response = await axios.get('/Lancamento');
    return response.data;
  },
  {
    refetchOnWindowFocus: false
  });

  const { isSuccess: isSuccessAdd, mutate: AddLancamento, variables } = useMutation('lancamento', async () => {
    if(variables)
      await axios.post('/Lancamento', variables);
  });

  function onSubmit(valor, descricao, data) {
    setFormShow(false);
    AddLancamento({ valor, descricao, data });
  }

  useEffect(() => {
    if(isSuccessAdd)  refetchLancamentos();
  }, [isSuccessAdd]);

  return (
    <Container>
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
