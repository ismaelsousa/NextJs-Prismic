import Head from 'next/head'

interface SEOProps{
  title:string;
  description?:string
  image?:string
  shouldExcludeTitleSuffix?:boolean
  shouldIndexPage?:boolean
}

export default function SEO({
  title,
  description,
  image,
  shouldExcludeTitleSuffix=false,
  shouldIndexPage=true,
}:SEOProps){
  
  const pageTitle = `${title} ${!shouldExcludeTitleSuffix ? '| Suffix':''}`
  return (
    <Head>
      <title>{pageTitle}</title>
     {description&& <meta name="description" content={description}/>}
     {image && <meta name='image' content={image}/>}
     {!shouldIndexPage && <meta name='robots' content='noindex, notfollow'/>}

      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta name="MobileOptimized" content="320" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="theme-color" content="#121214" />
      <meta name="msapplication-TileColor" content="#121214" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="google" content="notranslate" />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:alt" content="Thumbnail" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@" />
      <meta name="twitter:creator" content="@" />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:src" content={image} />
      <meta name="twitter:image:alt" content="Thumbnail" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="620" />
    </Head>
  )
}