# Background
Aiming to reduce chances of toxic order flow, when dynamic fee and external economical reward are not an option, by motivating volume from uninformed traders through raffling on each swap. We collect a small premiums from each swap to a pot, and traders earn a chance to win the jackpot accumulated within the hook (seperated by pool). When winner claims the prize, small portion will flow to the Hook as a fee and also as bonus for LP (later patch). 


# Instruction
Hook contracts can be found under `/blockchain/contract/`

- RaffleHook.sol - first attempt to recreate raffle experience on top of Uniswap experience.
- RaffleHookV2.sol - seoncd attempt to enable raffle experience by utilising `BeforeSwapReturnDelta` and `Claim tokens`.

Frontend UX can be simulated under `/frontend-uniswap-raffle`, which is currently not connected to the contract yet.
