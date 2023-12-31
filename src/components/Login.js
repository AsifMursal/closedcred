import React from 'react'
import { useState,useEffect } from 'react'
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { useNavigate } from 'react-router-dom';
// import{Web3} from 'web3';
const Web3=require('web3')
export default function Login() {

    const [web3auth, setWeb3auth] = useState(null);
    const [provider, setProvider] = useState(null);
    const navigate=useNavigate();

    const clientId =
    "BMRK2HAmHBpmz5d2ouTDc0haOrZVXkeWjV06ey3H-tQBi14BAhou626rKQm_-IUjoSQ5hbs3ruk_OkrD8j06fs8";
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
              web3AuthNetwork: "aqua",
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
      
      const login = async () => {
        if (!web3auth) {
          console.log("web3auth not initialized yet");
          return;
        }
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
        localStorage.setItem('user',JSON.stringify(provider));
        // getAccounts();
        // setLoginwindow(false);
        navigate('/upiform');
    
      };
  return (
    <div>
      <button onClick={login} > Login </button>
    </div>
  )
}
