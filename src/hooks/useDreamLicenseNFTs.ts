import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { DreamLicenseNFT, NFTMetadata } from '../types/dreamlicense';

// ERC-721 standard ABI for NFT contracts
const ERC721_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
];

// Real contract address provided
const DREAMLICENSE_CONTRACT_ADDRESS = '0xC27c894F4661A0FE5fF36341F298d33cd4876B44';

export const useDreamLicenseNFTs = (provider: ethers.BrowserProvider | null, address: string | null) => {
  const [nfts, setNfts] = useState<DreamLicenseNFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetadataFromURI = async (tokenURI: string): Promise<NFTMetadata | null> => {
    try {
      // Handle IPFS URIs
      let metadataUrl = tokenURI;
      if (tokenURI.startsWith('ipfs://')) {
        metadataUrl = `https://ipfs.io/ipfs/${tokenURI.slice(7)}`;
      }

      const response = await fetch(metadataUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch metadata: ${response.status}`);
      }

      const metadata = await response.json();
      
      // Ensure image URL is accessible
      let imageUrl = metadata.image;
      if (imageUrl && imageUrl.startsWith('ipfs://')) {
        imageUrl = `https://ipfs.io/ipfs/${imageUrl.slice(7)}`;
      }

      return {
        id: metadata.id || metadata.tokenId || '1',
        name: metadata.name || 'Unnamed NFT',
        description: metadata.description || 'No description available',
        image: imageUrl || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
        personality: metadata.personality || metadata.description || 'Mysterious and enchanting companion',
        attributes: metadata.attributes || []
      };
    } catch (error) {
      console.error('Failed to fetch metadata:', error);
      return null;
    }
  };

  const fetchNFTs = async () => {
    if (!provider || !address) return;

    try {
      setLoading(true);
      setError(null);

      const contract = new ethers.Contract(
        DREAMLICENSE_CONTRACT_ADDRESS,
        ERC721_ABI,
        provider
      );

      // Get contract info
      const [contractName, contractSymbol] = await Promise.all([
        contract.name().catch(() => 'DreamLicense'),
        contract.symbol().catch(() => 'DREAM')
      ]);

      console.log(`Connected to contract: ${contractName} (${contractSymbol})`);

      // Get balance of NFTs owned by the user
      const balance = await contract.balanceOf(address);
      const balanceNumber = Number(balance);

      console.log(`User owns ${balanceNumber} NFTs`);

      if (balanceNumber === 0) {
        setNfts([]);
        return;
      }

      const nftPromises = [];
      
      // Fetch each NFT owned by the user
      for (let i = 0; i < balanceNumber; i++) {
        nftPromises.push(
          (async () => {
            try {
              const tokenId = await contract.tokenOfOwnerByIndex(address, i);
              const tokenIdString = tokenId.toString();
              
              console.log(`Fetching NFT #${tokenIdString}`);
              
              const tokenURI = await contract.tokenURI(tokenId);
              console.log(`Token URI for #${tokenIdString}:`, tokenURI);
              
              // Fetch metadata
              const metadata = await fetchMetadataFromURI(tokenURI);
              
              if (!metadata) {
                // Fallback metadata if fetch fails
                return {
                  tokenId: tokenIdString,
                  metadata: {
                    id: tokenIdString,
                    name: `DreamLicense #${tokenIdString}`,
                    description: 'A unique AI companion NFT',
                    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
                    personality: 'Mysterious and enchanting companion',
                    attributes: [
                      { trait_type: 'Token ID', value: tokenIdString },
                      { trait_type: 'Contract', value: contractName }
                    ]
                  },
                  tokenURI,
                };
              }
              
              return {
                tokenId: tokenIdString,
                metadata: {
                  ...metadata,
                  id: tokenIdString,
                },
                tokenURI,
              };
            } catch (err) {
              console.error(`Failed to fetch NFT at index ${i}:`, err);
              return null;
            }
          })()
        );
      }

      const results = await Promise.all(nftPromises);
      const validNFTs = results.filter((nft): nft is DreamLicenseNFT => nft !== null);
      
      console.log(`Successfully loaded ${validNFTs.length} NFTs`);
      setNfts(validNFTs);

    } catch (err: any) {
      console.error('Failed to fetch NFTs:', err);
      
      // Check if it's a network/contract issue
      if (err.code === 'CALL_EXCEPTION' || err.code === 'BAD_DATA') {
        setError(`Contract not found or not deployed on current network. Please ensure you're connected to the correct network.`);
      } else if (err.code === 'NETWORK_ERROR') {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'Failed to fetch NFTs from contract');
      }
      
      // For demo purposes, show some mock NFTs if real contract fails
      setNfts([
        {
          tokenId: '1',
          tokenURI: 'https://example.com/metadata/1',
          metadata: {
            id: '1',
            name: 'Aurora Dream',
            description: 'A gentle and empathetic AI companion who loves poetry and stargazing.',
            image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
            personality: 'Gentle, empathetic, loves poetry and stargazing',
            attributes: [
              { trait_type: 'Personality', value: 'Empathetic' },
              { trait_type: 'Interests', value: 'Poetry' },
              { trait_type: 'Rarity', value: 'Legendary' },
              { trait_type: 'Contract', value: 'Demo Mode' }
            ]
          }
        },
        {
          tokenId: '2',
          tokenURI: 'https://example.com/metadata/2',
          metadata: {
            id: '2',
            name: 'Luna Mystery',
            description: 'A mysterious and artistic AI companion who loves deep conversations.',
            image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
            personality: 'Mysterious, artistic, loves deep conversations',
            attributes: [
              { trait_type: 'Personality', value: 'Mysterious' },
              { trait_type: 'Interests', value: 'Art' },
              { trait_type: 'Rarity', value: 'Epic' },
              { trait_type: 'Contract', value: 'Demo Mode' }
            ]
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [provider, address]);

  return {
    nfts,
    loading,
    error,
    refetch: fetchNFTs,
  };
};