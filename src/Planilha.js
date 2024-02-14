import React, { useState, useEffect } from 'react';
import Lancamentos from './Lancamentos';
import Valor from './Valor';
import Form from './Form';

function Planilha() {
  const [valores, setValores] = useState([]);
  const [show, setShow] = useState(false);

  function onSubmit(valor, descricao, data) {
    setShow(false);
    setValores([...valores, new Valor(valor, descricao, data)]);
  }

  function clear() {
    if (confirm('Limpar a lista')) {
      setValores([]);
      localStorage.setItem('planilha', []);
    }
  }

  useEffect(() => {
    if (valores?.length > 0)
      localStorage.setItem('planilha', JSON.stringify(valores));
  }, [valores]);

  useEffect(() => {
    try {
      const savedValores = JSON.parse(localStorage.getItem('planilha'));
      if (savedValores) setValores(savedValores);
    } catch {}
  }, []);

  return (
    <div>
      <h1>Minha conta</h1>
      {show ? (
        <Form onSubmit={onSubmit} />
      ) : (
        <>
          <button onClick={() => clear()}>Limpar</button>
          <button onClick={() => setShow(true)}>adicionar</button>
        </>
      )}
      <Lancamentos title="Saídas" value={valores.filter((f) => f.valor <= 0)} />
      <Lancamentos
        title="Entradas"
        value={valores.filter((f) => f.valor > 0)}
      />
    </div>
  );
}

export default Planilha;
