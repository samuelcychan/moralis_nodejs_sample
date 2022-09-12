'use strict'

const express = require('express')
const Moralis = require('moralis').default
const { EvmChain} = require("@moralisweb3/evm-utils")

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

const MORALIS_API_KEY = ""
const address = ""
const chain = EvmChain.ETHEREUM

async function fetchBalance() {
  const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
    address, chain,
  })
  const native = nativeBalance.result.balance.ether
  return { native }
}

// App
const app = express()
app.get('/', async (req, res) => {
  try {
    const data = await fetchBalance()
    res.status(200)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500)
    res.json({ error: error.message })
  }
})

const startServer = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  })
  
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
  }) 
}

startServer()
