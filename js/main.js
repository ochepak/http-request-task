window.onload = () => {

    ajaxRequest(data => {
        console.log('\nAjax request:');
        console.log(data);
    });

    jqueryRequest(data => {
        console.log('\nJQuery request:');
        console.log(data);
    });

    function ajaxRequest(callback) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callback(JSON.parse(xhr.responseText));
                } else {
                    console.error('Ajax request FAILED\n' + xhr.status + ": " + xhr.statusText);
                };
            };
        };
        try {
            xhr.open('GET', 'https://api.github.com/users');
            xhr.send();
        } catch (error) {
            xhr.abort();
            console.error(error);
        }
    }

    function jqueryRequest(callback) {
        $.get('https://api.github.com/users', data => {
            callback(data);
        }).fail(e => {
            console.error('JQuery request FAILED\n' + e.status + ": " + e.statusText);
        });
    }
}