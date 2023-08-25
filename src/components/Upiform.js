import React from 'react'
import { useState,useEffect } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import RPC from "../web3RPC";
import { useNavigate } from 'react-router-dom';

export default function Upiform() {

 const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [chainId, setChainId] = useState("");
  const [userData, setUserData] = useState({});
  const [UpiID, setUpiID] = useState("");
    const navigate=useNavigate();

    const clientId =
    "BAVJ1sL2vQytfij3dmhWfEnzm6qYiH-vw-nq7GB2OF3it-Gqz-IVQ20Vf25rTZptrGR0xTOKL8LuPcsAboeZtOs";
    useEffect(() => {
      const init = async () => {
        try {
          const web3auth = new Web3Auth({
            clientId,
            chainConfig: {
              chainNamespace: CHAIN_NAMESPACES.EIP155,
              chainId: "0x13881",
              rpcTarget: "https://rpc-mumbai.maticvigil.com/",
            },
  
          });
  
          setWeb3auth(web3auth);
          await web3auth.initModal();
          setProvider(web3auth.provider);
          console.log(provider);
        } catch (error) {
          console.error(error);
        }
      };
  
      init();
    }, []);

      const sendata = async (UpiID) => {
        const user = await web3auth.getUserInfo();
        setUserData(user);
        const Name=userData.name;

        if (!provider) {
          console.log("provider not initialized yet");
          return;
        }
        console.log(provider)
        const rpc = new RPC(provider);
        const address = await rpc.getAccounts();
        setAddress(address);
        let AccountID=address;
        console.log(address);
        let result = await fetch("http://localhost:5000/login", {
          method: "post",
          body: JSON.stringify({ Name, AccountID, UpiID }),
          headers: { 'Content-Type': 'application/json' }
        });
        result = await result.json();
        console.log(result);
        alert("UPI ID submitted successfully");
      };
      const logout = async () => {
        if (!web3auth) {
          console.log("web3auth not initialized yet");
          return;
        }
        const web3authProvider = await web3auth.logout();
        setProvider(web3authProvider);
        setBalance("");
        setAddress("");
        setUserData({});
        setChainId("");
        localStorage.removeItem('user');
        navigate('/')
      };

      const getAccounts = async () => {
        if (!provider) {
          console.log("provider not initialized yet");
          return;
        }
        console.log(provider)
        const rpc = new RPC(provider);
        const address = await rpc.getAccounts();
        setAddress(address);
        console.log(address);
      };
  return (
    <div>
      <input onChange={(e)=>{setUpiID(e.target.value);}} />
      <button onClick={()=>{sendata(UpiID); }}> Submit</button>
      <button onClick={logout}>LogOut</button>
      
    </div>
  )
}
