import React, {
    useState,
    useEffect
} from "react"
import Router from "next/router"

import _get from "lodash/get"
import _find from "lodash/find"
import _filter from "lodash/filter"
import _isEmpty from "lodash/isEmpty"

import { useQuery } from "@apollo/react-hooks"
import { ALL_POKEMON } from "../config/graphql/pokemon";

import LoadIndicator from "./lib/loading";
import InfiniteScroll from "react-infinite-scroller";

import dataType from "../type.json"

const List = ({ filter }) => {

    const [limit, setLimit] = useState(20)
    const [source, setSource] = useState([])

    const { data } = useQuery(ALL_POKEMON, {
        variables: {
            first: limit
        }
    })

    const moreData = () => {
        setTimeout(() => {
            setLimit(limit + 20)
        }, 1000);
    }

    useEffect(() => {
        const sourcePokemons = _get(data, "pokemons", [])
        if (!_isEmpty(sourcePokemons) > 0) {
            setSource(sourcePokemons)
        }
    }, [data])

    useEffect(() => {
        const sourcePokemons = _get(data, "pokemons", [])
        if (!_isEmpty(filter)) {
            const newSourcePokemons = _filter(sourcePokemons, function (u) {
                return u.types.includes(filter.type)
            });
            setSource(newSourcePokemons)
        }
        else {
            setSource(sourcePokemons)
        }
    }, [filter])

    return (
        <div className="flex justify-center pt-16">
            <InfiniteScroll
                initialLoad={false}
                loadMore={moreData}
                hasMore={limit < 150 && _isEmpty(filter)}
                loader={
                    <LoadIndicator key={1} source={source} />
                }
                className="w-full flex flex-wrap justify-center py-2"
            >
                {source.map((row, index) => (
                    <div
                        onClick={() => Router.push(`/${row.id}`)}
                        key={index}
                        className="flex flex-col bg-teal-900 justify-center w-1/5 my-4 mx-2 px-2 pt-4 border-4 border-white rounded-lg transform motion-reduce:transform-none hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-200 cursor-pointer">
                        <div className="bg-white p-10 mb-4 rounded-full">
                            <img src={row.image} className="h-40 w-40 object-contain" />
                        </div>
                        <div className="flex flex-col bg-teal-800 -mx-2 p-2 rounded-lg">
                            <span className="font font-sans text-white text-xl -mb-2">{row.number}</span>
                            <span className="font font-sans text-white text-2xl font-bold mb-2">{row.name}</span>
                            <div className="flex flex-row justify-around">
                                {row.types.map((row, index) => (
                                    <div key={index} className={`
                                    ${
                                        !_isEmpty(_find(dataType, ["type", row])) &&
                                        _find(dataType, ["type", row]).color
                                        }
                                    flex
                                    px-6
                                    py-1
                                    rounded-lg
                                    content-center
                                    `}>
                                        <span className="font font-sans text-white text-xs">{row}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div >
    )
}

export default List
