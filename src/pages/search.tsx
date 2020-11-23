import React, { useCallback, useState } from 'react';
import  {useRouter} from 'next/router'
import {Document} from 'prismic-javascript/types/documents'
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { GetServerSideProps } from 'next';
import { client } from '~/lib/prismic';
import Link from 'next/link'
interface SearchProps{
  searchResults:Document[]
}
const Search = ({searchResults}:SearchProps) => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSubmit = useCallback((e)=>{
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(search)}`)
  },[search])


  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e=>setSearch(e.target.value)}/>
        <button type='submit'>Search</button>
      </form>
      <ul>
        {searchResults.map(recommendedProduct=>{
          return (
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Search;

export const getServerSideProps: GetServerSideProps<SearchProps> = async (context) => {
  const {q} = context.query

  if(!q){
    return {props:{searchResults:[] as Document[]}}
  }

  const searchResults = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.fulltext('my.product.title', String(q))
  ])

  return {
    props:{searchResults:searchResults.results}
  }


}