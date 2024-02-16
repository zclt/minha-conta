import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Lancamentos from './Lancamentos';
import Form from './Form';

function Planilha() {
  const [show, setShow] = useState(false);

  const { data: lancamentos, refetch: refetchLancamentos } = useQuery('lancamentos', async () => {
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
    setShow(false);
    AddLancamento({ valor, descricao, data });
  }

  useEffect(() => {
    if(isSuccessAdd)  refetchLancamentos();
  }, [isSuccessAdd]);

  return (
    <div>
      <h1>Minha conta</h1>
      {show ? (
        <Form onSubmit={onSubmit} />
      ) : (
        <>          
          <button onClick={() => setShow(true)}>adicionar</button>
        </>
      )}
      <Lancamentos title="Saídas" value={lancamentos?.filter((f) => f.valor <= 0)} />
      <Lancamentos
        title="Entradas"
        value={lancamentos?.filter((f) => f.valor > 0)}
      />
    </div>
  );
}

export default Planilha;
