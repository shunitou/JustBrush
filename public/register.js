document.addEventListener('DOMContentLoaded', () => {
    const connectWalletBtn = document.getElementById('connect-wallet-btn');
    const walletAddressInput = document.getElementById('wallet-address');
  
    connectWalletBtn.addEventListener('click', async () => {
      // Check if MetaMask is installed and available
      if (window.ethereum) {
        try {
          // Request user's permission to access MetaMask accounts
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x89', // Polygon mainnet chain ID
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
              },
              rpcUrls: ['https://rpc-mainnet.maticvigil.com'], // Use your preferred RPC endpoint for Polygon
              blockExplorerUrls: ['https://polygonscan.com/']
            }]
          });
  
          // Get the selected account's address
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          const address = accounts[0];
  
          walletAddressInput.value = address;
          console.log('Connected wallet address:', address);
        } catch (error) {
          console.error('Failed to connect wallet:', error);
        }
      } else {
        console.error('MetaMask not found');
      }
    });
  });