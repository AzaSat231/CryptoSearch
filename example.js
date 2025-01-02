document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const suggestionsBox = document.getElementById("suggestions");

    // Automatically focus on the search input when the page loads
    searchInput.focus();

    // Sample data with keywords for each coin
const data = [
    { name: "Ethereum (ETH)", url: "https://etherscan.io/", keywords: ["eth", "ether", "ethereum", "эфир", "эфириум"] },
    { name: "Solana", url: "https://depinscan.io/chains/solana", keywords: ["sol", "solana blockchain", "сол", "солана", "солана блокчейн"] },
    { name: "Polygon zkEVM", url: "https://docs.polygon.technology/zkEVM/", keywords: ["polygon", "zk evm", "matic", "полигон", "матик", "zk evm"] },
    { name: "OP Mainnet", url: "https://optimism.blockscout.com/", keywords: ["optimism", "op", "оптимизм", "оп"] },
    { name: "Bitcoin", url: "https://blockstream.info/", keywords: ["btc", "bitcoin", "биткоин", "бтс"] },
    { name: "Smart Chain Mainnet (BNB)", url: "https://bscscan.com/", keywords: ["bsc", "binance", "bnb", "бск", "бинанс", "бнб"] },
    { name: "Polygon (MATIC)", url: "https://polygonscan.com/", keywords: ["matic", "polygon", "матик", "полигон"] },
    { name: "Avalanche (AVAX)", url: "https://avascan.info/", keywords: ["avax", "avalanche", "ава", "лавина"] },
    { name: "Fantom (FTM)", url: "https://ftmscan.com/", keywords: ["ftm", "fantom", "фантом", "фтм"] },
    { name: "Cardano (ADA)", url: "https://cardanoscan.io/", keywords: ["ada", "cardano", "ада", "кардано"] },
    { name: "Dogecoin", url: "https://blockchair.com/dogecoin", keywords: ["doge", "dogecoin", "доги", "доджкоин"] },
    { name: "Litecoin (LTC)", url: "https://blockchair.com/litecoin", keywords: ["ltc", "litecoin", "лайткоин", "лтк"] },
    { name: "Ripple (XRP)", url: "https://xrpscan.com/", keywords: ["xrp", "ripple", "рипл", "иксрп"] },
    { name: "Polkadot (DOT)", url: "https://www.statescan.io/", keywords: ["dot", "polkadot", "дот", "полкадот"] },
    { name: "Tron (TRX)", url: "https://tronscan.org/", keywords: ["trx", "tron", "трон", "трх"] },
    { name: "Cosmos (ATOM)", url: "https://atomscan.com/", keywords: ["atom", "cosmos", "космос", "атом"] },
    { name: "Tezos (XTZ)", url: "https://tzkt.io/", keywords: ["xtz", "tezos", "тезос", "хтз"] },
    { name: "Stellar (XLM)", url: "https://stellarchain.io/", keywords: ["xlm", "stellar", "стеллар", "хлм"] },
    { name: "Dash (DASH)", url: "https://blockchair.com/dash", keywords: ["dash", "даш"] },
    { name: "Algorand (ALGO)", url: "https://algoexplorer.io/", keywords: ["algo", "algorand", "алго", "алгранд"] },
    { name: "Arbitrum One", url: "https://arbiscan.io/", keywords: ["arbitrum", "one", "арбитрум", "ван"] },
    { name: "Near Protocol (NEAR)", url: "https://explorer.near.org/", keywords: ["near", "near protocol", "нир", "нир протокол"] },
    { name: "Harmony (ONE)", url: "https://explorer.harmony.one/", keywords: ["harmony", "one", "гармони", "ван"] },
    { name: "Base", url: "https://basescan.org/", keywords: ["base", "бейс"] },
    { name: "Blast", url: "https://blastscan.io/", keywords: ["blast", "бласт"] },
    { name: "Cronos", url: "https://cronoscan.com/", keywords: ["cronos", "cro", "кронос", "кр"] },
    { name: "Filecoin", url: "https://filfox.info/en", keywords: ["filecoin", "fil", "файлкоин", "фил"] },
    { name: "PulseChain", url: "https://scan.pulsechain.com/", keywords: ["pulsechain", "pls", "пульсчейн", "плс"] },
    { name: "Gnosis Chain", url: "https://gnosisscan.io/", keywords: ["gnosis", "xdai", "гнозис", "ксдай"] },
    { name: "Kava", url: "https://explorer.kava.io/", keywords: ["kava", "кава"] },
    { name: "Mantle", url: "https://mantlescan.io/", keywords: ["mantle", "мантл"] },
    { name: "Celo", url: "https://explorer.celo.org/", keywords: ["celo", "село"] },
    { name: "Linea", url: "https://lineascan.build/", keywords: ["linea", "линеа"] },
    { name: "Klaytn", url: "https://scope.klaytn.foundation/", keywords: ["klaytn", "klay", "клейтн", "клей"] },
    { name: "Metis Andromeda", url: "https://andromeda-explorer.metis.io/", keywords: ["metis", "andromeda", "метис", "андромеда"] },
    { name: "Astar", url: "https://astar.subscan.io/", keywords: ["astar", "астар"] },
    { name: "Telos EVM", url: "https://teloscan.io/", keywords: ["telos", "tlos", "телос", "тлос"] },
    { name: "IoTeX", url: "https://iotexscan.io/", keywords: ["iotex", "iotx", "иотекс", "иотх"] },
    { name: "Moonbeam", url: "https://moonscan.io/", keywords: ["moonbeam", "glmr", "мунбим", "глмр"] },
    { name: "Canto", url: "https://tuber.build/", keywords: ["canto", "канто"] },
    { name: "Conflux", url: "https://confluxscan.io/", keywords: ["conflux", "cfx", "конфлукс", "цфх"] },
    { name: "Aurora", url: "https://aurorascan.dev/", keywords: ["aurora", "аврора"] },
    { name: "Flare", url: "https://flare-explorer.flare.network/", keywords: ["flare", "flr", "флэр", "флр"] },
    { name: "OKXChain", url: "https://www.oklink.com/en/okc", keywords: ["okxchain", "okc", "okt", "окскчейн", "окт"] },
    { name: "Core Blockchain", url: "https://scan.coredao.org/", keywords: ["core blockchain", "core", "кор блокчейн", "кор"] },
    { name: "Meter", url: "https://scan.meter.io/", keywords: ["meter", "mtr", "метер", "мтр"] },
    { name: "Moonriver", url: "https://moonriver.moonscan.io/", keywords: ["moonriver", "movr", "мунривер", "мовр"] },
    { name: "Zilliqa EVM", url: "https://evmexplorer.zilliqa.com/", keywords: ["zilliqa", "zil", "зиллика", "зил"] },
    { name: "Songbird", url: "https://songbird-explorer.flare.network/", keywords: ["songbird", "sgb", "сонгбёрд", "сгб"] },
    { name: "Boba Network", url: "https://bobascan.com/", keywords: ["boba network", "boba", "боба сеть", "боба"] },
    { name: "Ultron", url: "https://ulxscan.com/", keywords: ["ultron", "ulx", "ультрон", "улкс"] },
    { name: "Dogechain", url: "https://explorer.dogechain.dog/", keywords: ["dogechain", "догчейн"] },
    { name: "Wanchain", url: "https://wanscan.org/", keywords: ["wanchain", "wan", "ванчейн", "ван"] },
    { name: "Evmos", url: "https://evm.evmos.org/", keywords: ["evmos", "эвмос"] },
];


    let activeIndex = -1;
    let debounceTimeout;

    // Update suggestions as user types
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        suggestionsBox.innerHTML = "";
    
        if (debounceTimeout) clearTimeout(debounceTimeout);
    
        debounceTimeout = setTimeout(() => {
            if (query) {
                const filteredData = data
                    .filter(item =>
                        item.name.toLowerCase().includes(query) || // Match by name
                        item.keywords.some(keyword => keyword.toLowerCase().includes(query)) // Match by keywords
                    )
                    .sort((a, b) => {
                        // Rank exact matches or names starting with the query higher
                        if (a.name.toLowerCase().startsWith(query) && !b.name.toLowerCase().startsWith(query)) {
                            return -1;
                        }
                        if (b.name.toLowerCase().startsWith(query) && !a.name.toLowerCase().startsWith(query)) {
                            return 1;
                        }
                        return a.name.localeCompare(b.name); // Secondary sort alphabetically
                    });
    
                filteredData.forEach((item, index) => {
                    const suggestion = document.createElement("div");
                    suggestion.classList.add("suggestion");
    
                    // Add the name and URL
                    suggestion.innerHTML = `
                        <span class="name">${item.name}</span>
                        <span class="url">${item.url}</span>
                    `;
                    suggestion.dataset.url = item.url;
                    suggestionsBox.appendChild(suggestion);
    
                    // Handle click event on suggestions
                    suggestion.addEventListener("click", () => {
                        window.location.href = item.url;
                    });
                });
    
                if (filteredData.length > 0) {
                    activeIndex = 0; // Automatically highlight the first suggestion
                    updateActiveSuggestion(document.querySelectorAll(".suggestion"));
                } else {
                    activeIndex = -1; // Reset active index
                }
    
                suggestionsBox.style.display = "block";
            } else {
                suggestionsBox.style.display = "none";
            }
        }, 300); // Debounce delay (300ms)
    });
    

    // Handle keyboard navigation and Enter key
    searchInput.addEventListener("keydown", (e) => {
        const suggestions = document.querySelectorAll(".suggestion");

        if (e.key === "ArrowDown") {
            // Move down
            activeIndex = (activeIndex + 1) % suggestions.length;
            updateActiveSuggestion(suggestions);
        } else if (e.key === "ArrowUp") {
            // Move up
            activeIndex = (activeIndex - 1 + suggestions.length) % suggestions.length;
            updateActiveSuggestion(suggestions);
        } else if (e.key === "Enter") {
            // Redirect to active suggestion
            if (activeIndex >= 0) {
                const url = suggestions[activeIndex].dataset.url;
                window.location.href = url;
            }
        }
    });

    // Highlight the active suggestion and scroll into view
    function updateActiveSuggestion(suggestions) {
        suggestions.forEach((suggestion, index) => {
            if (index === activeIndex) {
                suggestion.classList.add("active");
                suggestion.scrollIntoView({
                    block: "nearest",
                    inline: "nearest",
                });
            } else {
                suggestion.classList.remove("active");
            }
        });
    }

    // Hide suggestions if clicked outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest("#search-container")) {
            suggestionsBox.style.display = "none";
        }
    });
});