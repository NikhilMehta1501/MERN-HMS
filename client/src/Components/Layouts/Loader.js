import {Placeholder} from 'react-bootstrap';

const Loader = ({isLoading}) => {

  return (
    isLoading ?
    <>
      <Placeholder as="div" animation="glow">
        <Placeholder style={globalLoaderStyle} xs={12} />
      </Placeholder>
    </> : null
  );
}

const globalLoaderStyle={
  position: 'absolute',
  height: '36px',
  top: '50%'
}

export default Loader;