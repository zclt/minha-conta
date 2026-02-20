import Card from 'react-bootstrap/Card';
import * as moment from 'moment'

function Lancamento({ value }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>R$ {parseFloat(value.valor).toFixed(2)}</Card.Title>
        <Card.Text>
        <div className="lancamento-data">{moment(value.data).format("DD/MM/YY")}</div>
        {value.descricao}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Lancamento;
