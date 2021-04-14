export const SingleAssetModel = (nft_item) => {
  return nft_item ? creationAssetData(nft_item) : null
}

/* SINGLE MODEL EXAMPLE:

{
   "id":21560503,
   "token_id":"109262965384183563958720833598147892322913705783663097349373084921476392419329",
   "image_url":"https://lh3.googleusercontent.com/FUgW7DccbNZSD0DTxwxzw238-_k5IlLc4W7CnrInYWn0r9RF8vz-WerH6SLwotuLhzGSP-PGF9XPnteTEkPlqNcbUwrJ1gmARjEn8Q",
   "image_preview_url":"https://lh3.googleusercontent.com/FUgW7DccbNZSD0DTxwxzw238-_k5IlLc4W7CnrInYWn0r9RF8vz-WerH6SLwotuLhzGSP-PGF9XPnteTEkPlqNcbUwrJ1gmARjEn8Q=s250",
   "image_thumbnail_url":"https://lh3.googleusercontent.com/FUgW7DccbNZSD0DTxwxzw238-_k5IlLc4W7CnrInYWn0r9RF8vz-WerH6SLwotuLhzGSP-PGF9XPnteTEkPlqNcbUwrJ1gmARjEn8Q=s128",
   "asset_name":"\"NFT Tease\" - Digital Art NFT [1 of 1]",
   "asset_description":"Satirical original digital art piece on the current Twitter NFT ecosystem.\n",
   "asset_contract_address":"0x495f947276749ce646f68ac8c248420045cb7b5e",
   "asset_contract_schema_name":"ERC1155",
   "asset_contract_symbol":"OPENSTORE",
   "asset_contract_description":"",
   "current_price":"249000000000000000",
   "owner":"JPHDesign",
   "owner_profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/3.png",
   "creator":"JPHDesign",
   "collection_name":"JPH Design Gallery / NFT Museum",
   "collection_description":"Unique assortment of modern digital art/data science and photography medium given life and motion. \nCreator of [FUUL] Pods & RespawnBlocks & BioData NFTs. Collections will be featured in a future NFT Museum in Decentraland. Proceeds of early sales will fund Decentraland land purchcase. \nhttps://twitter.com/UpBlocks"
}

*/

const creationAssetData = (nft_item) => {
  const mainData = configureMainData(nft_item)
  const contractData = configureContractData(nft_item)
  const sellData = configureSellData(nft_item)
  const ownerData = configureOwnerData(nft_item)
  const creatorData = configureCreatorData(nft_item)
  const collectionData = configureCollectionData(nft_item)

  const result = {
    ...mainData,
    ...contractData,
    ...sellData,
    ...ownerData,
    ...creatorData,
    ...collectionData,
  }
  return result
}

const configureMainData = (nft_item) => {
  const result = {
    id: parsingData(nft_item.id),
    token_id: parsingData(nft_item.token_id),
    image_url: parsingData(nft_item.image_url)
      ? parsingData(nft_item.image_url)
      : '',
    image_preview_url: parsingData(nft_item.image_preview_url)
      ? parsingData(nft_item.image_preview_url)
      : '',
    image_thumbnail_url: parsingData(nft_item.image_thumbnail_url)
      ? parsingData(nft_item.image_thumbnail_url)
      : '',
    asset_name: parsingData(nft_item.name),
    asset_description: parsingData(nft_item.description)
  }
  return result
}

const configureContractData = (nft_item) => {
  return nft_item.asset_contract
    ? {
        asset_contract_address: parsingData(nft_item.asset_contract.address),
        asset_contract_schema_name: parsingData(
          nft_item.asset_contract.schema_name
        ),
        asset_contract_symbol: parsingData(nft_item.asset_contract.symbol),
        asset_contract_description: parsingData(
          nft_item.asset_contract.description
        )
      }
    : {
        asset_contract_address: '',
        asset_contract_schema_name: '',
        asset_contract_symbol: '',
        asset_contract_description: ''
      }
}

const configureCreatorData = (nft_item) => {
  if (nft_item.creator) {
    return nft_item.creator.user
      ? { creator: parsingData(nft_item.creator.user.username) }
      : { creator: '' }
  } else {
    return { creator: '' }
  }
}

const configureCollectionData = (nft_item) => {
  return nft_item.collection
    ? {
        collection_name: parsingData(nft_item.collection.name),
        collection_description: parsingData(nft_item.collection.description)
      }
    : {
        collection_name: '',
        collection_description: ''
      }
}

const configureSellData = (nft_item) => {
  if (Array.isArray(nft_item.orders) & (nft_item.orders.length != 0)) {
    const lastOrder = getLastItemOfArray(nft_item.orders)
    return {
      current_price: lastOrder.current_price
    }
  } else {
    return {
      current_price: ''
    }
  }
}

const configureOwnerData = (nft_item) => {

  if (Array.isArray(nft_item.top_ownerships) &
    (nft_item.top_ownerships.length != 0)
  ) {
    const lastOwnerShip = getLastItemOfArray(nft_item.top_ownerships)
    const owner = parsingData(lastOwnerShip.owner)
    if (owner) {
      return {
        owner: checkOwnerUserName(owner),
        owner_profile_img_url: parsingData(owner.profile_img_url)
      }
    } else {
      return {
        owner: '',
        owner_profile_img_url: ''
      }
    }

  } else {
    return {
      owner: '',
      owner_profile_img_url: ''
    }
  }
}

const checkOwnerUserName = (owner) => {
  if (owner.user) {
    return owner.user.username ? parsingData(owner.user.username) : ''
  } else {
    return ''
  }
}

const getLastItemOfArray = (array) => {
  try {
    const { length: l, [l - 1]: last_item } = array
    return last_item
  } catch (error) {
    console.log(`List Order : ${error}`)
    return {}
  }
}

const parsingData = (data) => {
  return data ? data : ''
}
