import React, { useState } from 'react';

function Form({ onSubmit }) {
  const [valor, setValor] = useState();
  const [descricao, setDescricao] = useState();
  const [data, setData] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(valor, descricao, data);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label for="valor">Valor </label>
        <input
          id="valor"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Digite o valor..."
          step="0.1"
        />
        <label for="descricao">Descrição</label>
        <input
          id="descricao"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite a descrição..."
        />
        <label for="data">Data</label>
        <input
          type="date"
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button onClick={() => onSubmit()}>Cancelar</button>
        <input type="submit" value="Salvar" />
      </form>
    </div>
  );
}

export default Form;
