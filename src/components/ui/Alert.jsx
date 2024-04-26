import Alert from 'react-bootstrap/Alert';

const AlertComponent = ({_alertVariant, _alertText}) => {
    return ( 
        <Alert variant={_alertVariant} className='my-1'>{_alertText}</Alert>
     );
}
 
export default AlertComponent;