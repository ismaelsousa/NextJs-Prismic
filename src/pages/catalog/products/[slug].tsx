import React from 'react';
import  {useRouter} from 'next/router'
import { client } from '~/lib/prismic'
import {Document} from 'prismic-javascript/types/documents'
import PrismicDOM from 'prismic-dom'
import { GetStaticPaths, GetStaticProps } from 'next';


interface ProductProps {
  product:Document
}

const Product = ({product}:ProductProps ) => {
  const router = useRouter()

  if(router.isFallback){
    return <h1>Carregando...</h1>
  }

  return (
    <div>
      <h1>
       {PrismicDOM.RichText.asText(product.data.title)}
      </h1>
      <img src={product.data.thumbnail.url} width="300" alt="image"/>
      <div dangerouslySetInnerHTML={{__html:PrismicDOM.RichText.asHtml(product.data.description)}}></div>
      <p>Price: {Number(product.data.price).toLocaleString('pt-br')} </p>
    </div>
  )
}


export default Product;


export const getStaticPaths: GetStaticPaths= async ()=>{
  return { 
    paths:[],
    fallback:true 
  }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context)=>{
  const {slug} = context.params

  const product = await client().getByUID('product',String(slug), {})

 
  return { 
    props:{
      product
    },
    revalidate:10
  }

}
