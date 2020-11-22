import React, { useCallback, useState } from 'react';
import  {useRouter} from 'next/router'
import dynamic from 'next/dynamic'

const AddToCartModal = dynamic(
  ()=>import('~/components/AddToCartModal'),
  {loading:()=><p>Loading...</p>, ssr:false}
)

const Product: React.FC = () => {
  const router = useRouter()
  const [isAddToCartModalVisible,setIsAddToCartModalVisible] = useState(false)

  const handleAddToCart = useCallback(()=>{
    setIsAddToCartModalVisible(old=>!old)
  },[])
  return (
    <div>
      <h1>{router.query.slug}</h1>
      <button onClick={handleAddToCart}>Add to cart</button>
      {isAddToCartModalVisible&& <AddToCartModal/>}
    </div>
  )
}

export default Product;