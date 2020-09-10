import React, {
  useState
} from "react"

import List from "../components/list.component"
import Header from "../components/header.component"

const Index = () => {
  const [filter, setFilter] = useState("")

  return (
    <div>
      <Header filter={filter} setFilter={setFilter} />
      <List filter={filter} />
    </div>
  )
}

export default Index