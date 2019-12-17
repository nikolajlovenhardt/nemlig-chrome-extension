chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            "action": "add_product_to_basket",
            "products": {
                "5010072": 1,
                "5027572": 1,
                "5037628": 2,
                "5037843": 1,
                "5009324": 1
            }
        });
    });
});
