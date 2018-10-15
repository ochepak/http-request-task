window.onload = () => {

    ajaxRequest(data => {
        console.log('\nAjax request:');
        console.log(data);
    });

    jqueryRequest(data => {
        console.log('\nJQuery request:');
        console.log(data);
    });

    fetchRequest(data => {
        console.log('\nFetch request:');
        console.log(data);    
    });

    axiosRequest()
        .then(data => {
            console.log('\nAxios request:');
            console.log(data);
            renderList(data, 'list');
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
        xhr.open('GET', 'https://api.github.com/users');
        xhr.send();
    }

    function jqueryRequest(callback) {
        $.get('https://api.github.com/users', data => {
            callback(data);
        }).fail(e => {
            console.error('JQuery request FAILED\n' + e.status + ": " + e.statusText);
        });
    }

    function fetchRequest(callback) {
        fetch('https://api.github.com/users')
            .then(response => {
                if (!response.ok) {
                    console.error('Fatch request FAILED\n' + response.status + ": " + response.responseText);
                    return;
                }
                return response.json();
            }).then(users => {
                callback(users);
            }).catch(e => {
                console.error(e);
            });
    }

    async function axiosRequest() {
        let response = await axios.get('https://api.github.com/users')
            .catch(error => console.error(`Axios request FAILED\n ${error}`));
        return response.data;
    }

    function renderList(list, containerId) {
        let ul = document.getElementById(containerId);
        let frag = document.createDocumentFragment();

        //render each user
        list.forEach(user => {
            //creating elements
            let li = document.createElement('li');
            let idElem = document.createElement('span');
            let imgElem = document.createElement('img');
            let nameElem = document.createElement('a');

            //elements setting
            li.classList.add('list-group-item');
            idElem.innerHTML = user.id + '.';
            nameElem.setAttribute('href', user.url);
            nameElem.setAttribute('target', '_blank');
            nameElem.innerHTML = user.login;
            imgElem.setAttribute('src', user.avatar_url);

            //elements appending
            li.append(idElem, imgElem, nameElem);
            frag.appendChild(li);
        });

        //adding users in list
        ul.innerHTML = '';
        ul.appendChild(frag);
    }
}