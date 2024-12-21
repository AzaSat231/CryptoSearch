document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const suggestionsBox = document.getElementById("suggestions");

    // Automatically focus on the search input when the page loads
    searchInput.focus();

    // Sample data with keywords for each coin
    const data = [
        { name: "Ethereum (ETH)", url: "https://etherscan.io/", keywords: ["eth", "ether", "ethereum"] },
        { name: "Solana", url: "https://depinscan.io/chains/solana", keywords: ["sol", "solana blockchain"] },
        { name: "Polygon zkEVM", url: "https://docs.polygon.technology/zkEVM/", keywords: ["polygon", "zk evm", "matic"] },
        { name: "OP Mainnet", url: "https://optimism.blockscout.com/", keywords: ["optimism", "op"] },
        { name: "Bitcoin", url: "https://blockstream.info/", keywords: ["btc", "bitcoin"] },
        { name: "Smart Chain Mainnet (BNB)", url: "https://bscscan.com/", keywords: ["bsc", "binance", "bnb"] },
        { name: "Polygon (MATIC)", url: "https://polygonscan.com/", keywords: ["matic", "polygon"] },
        { name: "Avalanche (AVAX)", url: "https://avascan.info/", keywords: ["avax", "avalanche"] },
        { name: "Fantom (FTM)", url: "https://ftmscan.com/", keywords: ["ftm", "fantom"] },
        { name: "Cardano (ADA)", url: "https://cardanoscan.io/", keywords: ["ada", "cardano"] },
        { name: "Dogecoin", url: "https://blockchair.com/dogecoin", keywords: ["doge", "dogecoin"] },
        { name: "Litecoin (LTC)", url: "https://blockchair.com/litecoin", keywords: ["ltc", "litecoin"] },
        { name: "Ripple (XRP)", url: "https://xrpscan.com/", keywords: ["xrp", "ripple"] },
        { name: "Polkadot (DOT)", url: "https://www.statescan.io/", keywords: ["dot", "polkadot"] },
        { name: "Tron (TRX)", url: "https://tronscan.org/", keywords: ["trx", "tron"] },
        { name: "Cosmos (ATOM)", url: "https://atomscan.com/", keywords: ["atom", "cosmos"] },
        { name: "Tezos (XTZ)", url: "https://tzkt.io/", keywords: ["xtz", "tezos"] },
        { name: "Stellar (XLM)", url: "https://stellarchain.io/", keywords: ["xlm", "stellar"] },
        { name: "Dash (DASH)", url: "https://blockchair.com/dash", keywords: ["dash"] },
        { name: "Algorand (ALGO)", url: "https://algoexplorer.io/", keywords: ["algo", "algorand"] },
        { name: "Arbitrum One", url: "https://arbiscan.io/", keywords: ["arbitrum", "one"] },
        { name: "Near Protocol (NEAR)", url: "https://explorer.near.org/", keywords: ["near", "near protocol"] },
        { name: "Harmony (ONE)", url: "https://explorer.harmony.one/", keywords: ["harmony", "one"] },
        { name: "Base", url: "https://basescan.org/", keywords: ["base"] },
        { name: "Blast", url: "https://blastscan.io/", keywords: ["blast"] },
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