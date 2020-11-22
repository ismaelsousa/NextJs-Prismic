import React from 'react';
import  {useRouter} from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link'
import { client } from '~/lib/prismic'
import Prismic from 'prismic-javascript'
import {Document} from 'prismic-javascript/types/documents'
import PrismicDOM from 'prismic-dom'
interface CategoriesProps{
  category: Document;
  products: Document[];
}
const Categories = ({products, category}:CategoriesProps) => {
  const router = useRouter()

  if(router.isFallback){
    return <h1>Carregando...</h1>
  }
  return (
    <div >
     <h1>
     {PrismicDOM.RichText.asText(category.data.title)}
       </h1>
     <div >
      <ul>
        {products.map(Product=>{
          return (
            <li key={Product.id}>
              <Link href={`/catalog/products/${Product.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(Product.data.title)}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
     </div>
    </div>)
}

export default Categories;

/**
 * when we have dynamic paths, we add the props below to indicate some that exist in our database
 */
export const getStaticPaths: GetStaticPaths = async ()=>{
  const categories = await client().query([
    Prismic.Predicates.at('document.type', 'category'),
  ])
  const paths = categories.results.map(category=>{
    return {
      params:{slug:category.uid}
    }
  })
  return { 
    paths,
    fallback:true // if the page not exist, with fallback=true, it will be generated
  }
}

export const getStaticProps : GetStaticProps<CategoriesProps> = async (context)=>{
  const {slug} = context.params

  const category = await client().getByUID('category',String(slug), {})

  const products = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.at('my.product.category', category.id)
  ])
  return { 
    props:{
      products:products.results,
      category
    },
    revalidate:60
  }

}