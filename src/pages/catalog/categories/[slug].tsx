import React from 'react';
import  {useRouter} from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next';
import { Title } from '../../../styles/pages/Home';
// import { Container } from './styles';



interface IProduct {
  id:string;
  title:string
}
interface CategoriesProps{
  products: IProduct[]
}
const Categories = ({products}:CategoriesProps) => {
  const router = useRouter()

  if(router.isFallback){
    return <h1>Carregando...</h1>
  }
  return (
    <div >
     <h1>{router.query.slug}</h1>
     <div >
      <Title>Top10</Title>
      <ul>
        {products.map(Product=>{
          return (
            <li key={Product.id}>
              {Product.title}
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
  const response = await fetch(`http://localhost:3333/categories`) 
  const categories = await response.json()

  const paths = categories.map(category=>{
    return {
      params:{slug:category.id}
    }
  })
  return { 
    paths,
    fallback:true // if the page not exist, with fallback=true, it will be generated
  }
}

export const getStaticProps : GetStaticProps<CategoriesProps> = async (context)=>{
  const {slug} = context.params
  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`) 
  const products = await response.json()
  return { 
    props:{
      products
    },
    revalidate:60
  }

}