import React from 'react';
import * as moment from 'moment'

function Lancamento({ value }) {
  return (
    <div className="lancamento">
      <div className="lancamento-data">{moment(value.data).format("DD/MM/YY")}</div>
      <h3>{value.descricao}</h3>
      <p>
        R$ {parseFloat(value.valor).toFixed(2)}
      </p>
    </div>
  );
}

export default Lancamento;
