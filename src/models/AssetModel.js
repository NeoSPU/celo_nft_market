export const AssetModel = (nft_item) => {
  return nft_item ? creationAssetsData(nft_item) : null
}

const creationAssetsData = (nft_item) => {
  const mainData = configureMainData(nft_item)
  const contractData = configureContractData(nft_item)
  const creatorData = configureCreatorData(nft_item)
  const collectionData = configureCollectionData(nft_item)
  const sellData = configureSellData(nft_item)

  const result = {
    ...mainData,
    ...contractData,
    ...creatorData,
    ...collectionData,
    ...sellData
  }
  return result
}

const configureMainData = (nft_item) => {
  const result = {
    id: parsingData(nft_item.id),
    token_id: parsingData(nft_item.token_id),
    image_url: parsingData(nft_item.image_url) ? parsingData(nft_item.image_url) : '',
    image_thumbnail_url: parsingData(nft_item.image_thumbnail_url) ? parsingData(nft_item.image_thumbnail_url) : '',
    animation_url: parsingData(nft_item.animation_url) ? parsingData(nft_item.animation_url) : '',
    background_color: parsingData(nft_item.background_color),
    asset_name: parsingData(nft_item.name),
    asset_description: parsingData(nft_item.description)
  }
  return result
}

const configureContractData = (nft_item) => {
  return nft_item.asset_contract
    ? {
        asset_contract_address: parsingData(nft_item.asset_contract.address),
        asset_contract_type: parsingData(
          nft_item.asset_contract.asset_contract_type
        ),
        asset_contract_created_date: parsingData(
          nft_item.asset_contract.created_date
        ),
        asset_contract_name: parsingData(nft_item.asset_contract.name),
        asset_contract_schema_name: parsingData(
          nft_item.asset_contract.schema_name
        ),
        asset_contract_symbol: parsingData(nft_item.asset_contract.symbol),
        asset_contract_image_url: parsingData(
          nft_item.asset_contract.image_url
        ),
        asset_contract_description: parsingData(
          nft_item.asset_contract.description
        ),
        asset_contract_external_link: parsingData(
          nft_item.asset_contract.external_link
        )
      }
    : {
        asset_contract_address: '',
        asset_contract_type: '',
        asset_contract_created_date: '',
        asset_contract_name: '',
        asset_contract_schema_name: '',
        asset_contract_symbol: '',
        asset_contract_image_url: '',
        asset_contract_description: '',
        asset_contract_external_link: ''
      }
}

const configureCreatorData = (nft_item) => {
  if (nft_item.creator) {
    return nft_item.creator.user
      ? { creator: parsingData(nft_item.creator.user.username)}
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
  if (Array.isArray(nft_item.sell_orders) & nft_item.sell_orders.length != 0) {
    const lastOrder = getLastItemOfArray(nft_item.sell_orders)
    const sellerContract = checkSellContract(lastOrder.tockenContract)
    return {
      ...sellerContract,
      sell_order_price: lastOrder.current_price,
    }
  } else {
    return {
      sell_order_price: '',
      sell_order_token_symbol: '',
      sell_order_usd_token_name: '',
      sell_order_decimals: '',
      sell_order_eth_price: '',
      sell_order_usd_price: ''
    }
  }
}

const checkSellContract = (tockenContract) => {
  if (tockenContract) {
    return {
      sell_order_token_symbol: parsingData(tockenContract.symbol),
      sell_order_usd_token_name: parsingData(tockenContract.name),
      sell_order_decimals: parsingData(tockenContract.decimals),
      sell_order_eth_price: parsingData(tockenContract.eth_price),
      sell_order_usd_price: parsingData(tockenContract.usd_price)
    }
  } else {
    return {
      sell_order_token_symbol: '',
      sell_order_usd_token_name: '',
      sell_order_decimals: '',
      sell_order_eth_price: '',
      sell_order_usd_price: ''
    }
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
