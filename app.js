// Direcciones de Contratos (Cambiar por las reales tras el despliegue)
const ZARD_ADDRESS = "0x3468ea4e6ce13ec4c7f8651f7efc6aa6046f4d65"; 
const PANCAKE_ROUTER = "0x10ED43C718714eb63d5a57bBf789481a623a2d6f"; 
// const TU_NUEVO_TOKEN = "0xTuNuevoToken..."; // Dirección del token que creaste

let provider, signer, userAddress;

// Elementos del DOM
const connectBtn = document.getElementById("connectWalletBtn");
const statusText = document.getElementById("statusText");

async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            // Solicita conexión a MetaMask o Binance Wallet
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();
            
            // Actualiza la UI
            const shortAddress = userAddress.slice(0, 6) + "..." + userAddress.slice(-4);
            connectBtn.innerText = shortAddress;
            connectBtn.style.borderColor = "#00e676";
            connectBtn.style.color = "#00e676";
            statusText.innerText = "Billetera conectada en BSC. Listo para operar.";
            statusText.style.color = "#00e676";
            
        } catch (error) {
            console.error("Error conectando:", error);
            statusText.innerText = "Error al conectar billetera.";
        }
    } else {
        alert("Por favor, instala MetaMask o TrustWallet para usar la DApp.");
    }
}

// Escuchar botón de conectar
connectBtn.addEventListener("click", connectWallet);

// Escuchar cambios de red o cuenta
if (window.ethereum) {
    window.ethereum.on('accountsChanged', connectWallet);
    window.ethereum.on('chainChanged', () => window.location.reload());
}
