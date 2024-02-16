import React from 'react';

function Lancamento({ value }) {
  return (
    <div className="lancamento">
      <h3>R$ {parseFloat(value.valor).toFixed(2)}</h3>
      <p>
        {value.data} {value.descricao}
      </p>
    </div>
  );
}

export default Lancamento;
