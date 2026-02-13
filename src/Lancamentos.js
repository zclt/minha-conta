import Lancamento from './Lancamento';

function Lancamentos({ title, value }) {
  return (
    <section>
      <h2>{title}</h2>
      {value?.length > 0 ? (
        value.map((v,i) => <Lancamento key={i} value={v} />)
      ) : (
        <div className="lancamento">
          <p>Sem lançamentos</p>
        </div>
      )}
    </section>
  );
}

export default Lancamentos;
