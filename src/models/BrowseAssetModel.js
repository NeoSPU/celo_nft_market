export const BrowseAssetModel = (nft_item) => {
    return nft_item ? creationAssetsData(nft_item) : null
  }
  
  const creationAssetsData = (nft_item) => {
    const mainData = configureMainData(nft_item)
    const contractData = configureContractData(nft_item)
    const collectionData = configureCollectionData(nft_item)
    const sellData = configureSellData(nft_item)
  
    const result = {
      ...mainData,
      ...contractData,
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
      asset_name: parsingData(nft_item.name),
    }
    return result
  }

  const configureContractData = (nft_item) => {
    return nft_item.asset_contract
      ? {
          asset_contract_address: parsingData(nft_item.asset_contract.address)
        }
      : {
          asset_contract_address: ''
        }
  }
  
  const configureCollectionData = (nft_item) => {
    return nft_item.collection
      ? {
          collection_name: parsingData(nft_item.collection.name),
        }
      : {
          collection_name: '',
        }
  }
  
  const configureSellData = (nft_item) => {
    if (Array.isArray(nft_item.sell_orders) & nft_item.sell_orders.length != 0) {
      const lastOrder = getLastItemOfArray(nft_item.sell_orders)
      return {
        sell_order_price: lastOrder.current_price,
      }
    } else {
      return {
        sell_order_price: ''
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
  