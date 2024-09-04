# Installing Uniswap forge project into local hardhat project

1. Install foundry https://book.getfoundry.sh/getting-started/installation 
2. Install dependencies:
```
npm i
```

3. Clone Uniswap/v4-periphery
```
git clone https://github.com/Uniswap/v4-periphery.git lib/v4-periphery
```

4. Install Uniswap/v4-periphery dependencies.
```
cd lib/v4-periphery
forge install
```
