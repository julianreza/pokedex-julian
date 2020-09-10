import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { ApolloProvider } from '@apollo/react-hooks';

export const Context = React.createContext();

const Provider = ({ children, client }) => {
  const [isFetch, setIsFetch] = useState(false);
  const [dataPatient, setDataPatient] = useState([])
  const [dataCsv, setDataCsv] = useState({})
  const [tokens, setTokens] = useState("")

  const providerData = {
    state: {
      isFetch,
      dataPatient,
      dataCsv,
      tokens
    },
    action: {
      setIsFetch,
      setDataPatient,
      setDataCsv,
      setTokens
    },
  };

  return (
    <>
      <ApolloProvider client={client}>
        <Context.Provider value={providerData}>
          <div>
            {children}
          </div>
        </Context.Provider>
      </ApolloProvider>
    </>
  );
};

Provider.propTypes = {
  children: PropTypes.any.isRequired,
  client: PropTypes.any.isRequired,
}

export default Provider;
