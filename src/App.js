import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { useNavigate,BrowserRouter,Route,Routes } from 'react-router-dom';
import RPC from "./web3RPC";
import walletimg from "./img1.png"
import Login from "./components/Login"
import Upiform from './components/Upiform';
import PrivateComponent from './components/PrivateComponent';
import Scanner from './components/Scanner';

function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [chainId, setChainId] = useState("");
  const [userData, setUserData] = useState({});
  const [UpiID, setUpiID] = useState("");
  const [loginwindow, setLoginwindow] = useState(true);



  const clientId =
    "BAVJ1sL2vQytfij3dmhWfEnzm6qYiH-vw-nq7GB2OF3it-Gqz-IVQ20Vf25rTZptrGR0xTOKL8LuPcsAboeZtOs";
  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    setUserData(user);
    console.log(user);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setAddress(address);
    console.log(address);
    getUserInfo();
  };
  
  return (

    <div className="App">
      <img src={walletimg}></img><br/>
      <BrowserRouter>
      <Routes>
      <Route element={<PrivateComponent/>}>
        <Route path='/upiform' element={<Upiform/>}/>
      </Route>
      <Route path='/' element={<Login/>}/>
      <Route path='/scanner' element={<Scanner/>}/>
      

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
