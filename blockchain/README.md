# Installing Uniswap forge project into local hardhat project

1. Install foundry https://book.getfoundry.sh/getting-started/installation 
2. Install dependencies:
```
npm i
```

3. Clone Uniswap/v4-periphery inside "blockchain" folder
```
git clone https://github.com/Uniswap/v4-periphery.git lib/v4-periphery
```

4. Install Uniswap/v4-periphery dependencies.
```
cd lib/v4-periphery
git checkout 255b20ebc574a9a50bfe44b2e175ff01315721e1
forge install
```
5. Go back to the directory "blockchain"

6. Run `npx hardhat compile` to compile the contracts. If there are errors, try running `npx hardhat clean` and then `npx hardhat compile` again.
