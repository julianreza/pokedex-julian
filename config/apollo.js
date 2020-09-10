import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import withApollo from 'next-with-apollo'
import _get from 'lodash/get'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import fetch from 'isomorphic-unfetch'
import _isEmpty from 'lodash/isEmpty'
import { Error } from '../components/lib/alert'

const GRAPHQL_HOST = process.env.GRAPHQL_HOST

const linkHttp = createHttpLink({
	fetch, // Switches between unfetch & node-fetch for client & server.
	uri: GRAPHQL_HOST,
})

const linkError = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		const error = _get(graphQLErrors, '0.message')
		Error(error)
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		)
	}
	if (networkError) console.log(`[Network error]: ${networkError}`)
})

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
	// You can get headers and ctx (context) from the callback params
	// e.g. ({ headers, ctx, initialState })
	({ initialState }) =>
		new ApolloClient({
			link: ApolloLink.from([linkError, linkHttp]),
			cache: new InMemoryCache()
				//  rehydrate the cache using the initial data passed from the server:
				.restore(initialState || {}),
		})
)
