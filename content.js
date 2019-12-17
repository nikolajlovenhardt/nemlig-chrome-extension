var getCookie = function (name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.action) {
            case 'add_product_to_basket':
                var products = request.products

                Object.keys(products).map(function (id) {
                    $.ajax({
                        url: '/webapi/basket/PlusOneToBasket',
                        type: 'post',
                        dataType: 'json',
                        data: JSON.stringify({productId: id, quantity: 0}),
                        xhr: function() {
                            // Get new xhr object using default factory
                            var xhr = jQuery.ajaxSettings.xhr();
                            // Copy the browser's native setRequestHeader method
                            var setRequestHeader = xhr.setRequestHeader;
                            // Replace with a wrapper
                            xhr.setRequestHeader = function(name, value) {
                                // Ignore the X-Requested-With header
                                if (name == 'X-Requested-With') return;
                                // Otherwise call the native setRequestHeader method
                                // Note: setRequestHeader requires its 'this' to be the xhr object,
                                // which is what 'this' is here when executed.
                                setRequestHeader.call(this, name, value);
                            }
                            // pass it on to jQuery
                            return xhr;
                        },
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json;charset=UTF-8',
                            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
                        },
                        async: false
                    });
                })

                Object.keys(products).map(function (id) {
                    $.ajax({
                        url: '/webapi/basket/AddToBasket',
                        type: 'post',
                        dataType: 'json',
                        data: JSON.stringify({productId: id, quantity: products[id]}),
                        xhr: function() {
                            // Get new xhr object using default factory
                            var xhr = jQuery.ajaxSettings.xhr();
                            // Copy the browser's native setRequestHeader method
                            var setRequestHeader = xhr.setRequestHeader;
                            // Replace with a wrapper
                            xhr.setRequestHeader = function(name, value) {
                                // Ignore the X-Requested-With header
                                if (name == 'X-Requested-With') return;
                                // Otherwise call the native setRequestHeader method
                                // Note: setRequestHeader requires its 'this' to be the xhr object,
                                // which is what 'this' is here when executed.
                                setRequestHeader.call(this, name, value);
                            }
                            // pass it on to jQuery
                            return xhr;
                        },
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json;charset=UTF-8',
                            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
                        },
                        async: false
                    });
                })

                alert('We\'ve added the desired products to your basket');
                window.location.reload();
                break;
        }
    }
);
