import React from "react"
import Router, {
    useRouter
} from "next/router";

import _get from "lodash/get"
import _find from "lodash/find"
import _isEmpty from "lodash/isEmpty"

import { useQuery } from "@apollo/react-hooks"
import { POKEMON_BY_ID } from "../config/graphql/pokemon";

import LoadIndicator from "../components/lib/loading";

import dataType from "../type.json"

const Pokemon = ({ filter }) => {

    const router = useRouter()
    const id = router.query.id || "a"

    const { data } = useQuery(POKEMON_BY_ID, {
        variables: {
            id
        }
    })

    const sourcePokemon = _get(data, "pokemon", [])

    return (
        <> {
            _isEmpty(sourcePokemon) ? <LoadIndicator source={sourcePokemon} /> :
                <div className="w-full flex flex-col bg-teal-900 flex justify-center items-center">
                    <div className="mb-20 flex flex-col items-center mt-8">
                        <span className="font font-sans text-white text-4xl">{sourcePokemon.number}</span>
                        <span className="font font-sans text-white text-4xl">{sourcePokemon.name}</span>
                    </div>
                    <div className="w-11/12 h-64 flex flex-row justify-between items-center bg-teal-700 rounded-full">
                        <div className="w-1/3">
                            <div className="w-full flex flex-col items-center mb-4">
                                <span className="font font-sans text-white font-medium text-2xl">Type</span>
                                <div className="w-full flex flex-row justify-center">
                                    {sourcePokemon.types.map((row, index) => (
                                        <div key={index}
                                            style={{
                                                backgroundColor:
                                                    !_isEmpty(_find(dataType, ["type", row])) &&
                                                    _find(dataType, ["type", row]).color
                                            }}
                                            className="flex px-6 py-1 rounded-lg content-center mr-2 ml-2">
                                            <span className="font font-sans text-white text-xl">{row}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full flex flex-row items-center px-6 mb-4">
                                <span className="w-1/2 font font-sans text-white text-xl">HP :</span>
                                <div className="w-3/4 flex py-1 rounded-lg justify-center bg-green-500 mr-2">
                                    <span className="font font-sans text-white text-xl"> {sourcePokemon.maxHP}</span>
                                </div>
                                <span className="w-1/2 font font-sans text-white text-xl ml-2">CP :</span>
                                <div className="w-3/4 flex py-1 rounded-lg justify-center bg-blue-900">
                                    <span className="font font-sans text-white text-xl"> {sourcePokemon.maxCP}</span>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center mb-4">
                                <div className="w-1/2 flex py-1 rounded-lg justify-center bg-indigo-600">
                                    <span className="font font-sans text-white text-xl"> {sourcePokemon.classification}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 bg-white p-16 rounded-full border-8 border-teal-700">
                            <img src={sourcePokemon.image} className="h-64 w-64 object-contain" />
                        </div>
                        <div className="w-1/3">
                            <div className="flex flex-row mb-2 mr-4">
                                <div className="flex flex-col mr-4">
                                    <span className="font font-sans text-white font-medium text-xl mr-2">Height</span>
                                    <span className="font font-sans text-white text-xl">
                                        {sourcePokemon.height.minimum} - {sourcePokemon.height.maximum}
                                    </span>
                                </div>
                                <div className="flex flex-col ml-4">
                                    <span className="font font-sans text-white font-medium text-xl mr-2">Weight</span>
                                    <span className="font font-sans text-white text-xl">
                                        {sourcePokemon.weight.minimum} - {sourcePokemon.weight.maximum}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row mb-2 mr-4">
                                <div className="flex flex-col">
                                    <span className="font font-sans text-white font-medium text-xl mr-2">Resistant</span>
                                    <span className="font font-sans text-white text-xl">
                                        {sourcePokemon.resistant.join(", ")}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row mr-4">
                                <div className="flex flex-col">
                                    <span className="font font-sans text-white font-medium text-xl mr-2">Weaknesses</span>
                                    <span className="font font-sans text-white text-xl">
                                        {sourcePokemon.weaknesses.join(", ")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!_isEmpty(sourcePokemon.evolutions) ?
                        <div className="mt-20 flex flex-col items-center mb-4">
                            <span className="font font-sans text-white font-medium text-4xl">Evolutions</span>
                            <div className="flex flex-row">
                                {
                                    sourcePokemon.evolutions.map((row, index) => (
                                        <div
                                            onClick={() => Router.push(`/${row.id}`)}
                                            className="flex flex-col items-center ml-4 mr-4 transform motion-reduce:transform-none hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-200 cursor-pointer">
                                            <span className="font font-sans text-white text-xl">{row.name}</span>
                                            <div className="bg-white p-6 rounded-full border-4 border-teal-700">
                                                <img src={row.image} className="h-20 w-20 object-contain" />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div> :
                        <div className="h-64" />
                    }
                </div>

        }</>
    )
}

export default Pokemon