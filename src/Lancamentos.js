import React from 'react';
import Lancamento from './Lancamento';

function Lancamentos({ title, value }) {
  return (
    <section>
      <h2>{title}</h2>
      {value.length > 0 ? (
        value.map((v) => <Lancamento value={v} />)
      ) : (
        <div class="lancamento">
          <p>Sem lançamentos</p>
        </div>
      )}
    </section>
  );
}

export default Lancamentos;
