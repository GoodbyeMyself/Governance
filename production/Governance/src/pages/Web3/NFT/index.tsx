import React from 'react';
// ant design web3 应用组件
import { Address, ConnectButton, Connector, NFTCard } from '@ant-design/web3';
// web3 应用套件
import { MetaMask, WagmiWeb3ConfigProvider } from '@ant-design/web3-wagmi';
// wagmi
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
// ant design 组件
import { Divider } from 'antd';

const config = createConfig({
    chains: [mainnet],
    transports: {
        [mainnet.id]: http(),
    },
    connectors: [
        injected({
            target: 'metaMask',
        }),
    ],
});

const web3: React.FC = () => {
    return (
        <div>
            <WagmiWeb3ConfigProvider config={config} wallets={[MetaMask()]}>
                <div>
                    <Address format address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9" />
                    <Divider orientation="left" plain>
                        分割线
                    </Divider>
                    <NFTCard address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9" tokenId={641} />
                    <Divider orientation="left" plain>
                        分割线
                    </Divider>
                    <Connector>
                        <ConnectButton />
                    </Connector>
                    <div
                        style={{
                            marginTop: 48,
                        }}
                    >
                        New Page
                    </div>
                </div>
            </WagmiWeb3ConfigProvider>
        </div>
    );
};

export default web3;
