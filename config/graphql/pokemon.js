import { gql } from 'apollo-boost';

export const ALL_POKEMON = gql`
  query q_all_pokemon($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      image
      types
    }
  }
`

export const POKEMON_BY_ID = gql`
  query q_pokemon_by_id($id: String!) {
    pokemon(id: $id) {
      id
      name
      number
      image
      types
      maxHP
      maxCP
      classification
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
      resistant
      weaknesses
      evolutions {
        id
        name
        image
      }
    }
  }
`