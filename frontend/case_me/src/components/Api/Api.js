// Рабочий вариант №1
export const register = (registrationData) => {
    fetch('https://caseme.pythonanywhere.com/api/users/', {
        method: 'POST',
        body: JSON.stringify(registrationData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                console.error('Ошибка:', response.status);
                console.log('response', response);

                response.json()
                    .then(res => {
                        console.log(res);
                        console.log(res.email);
                        console.log(res.username);
                        console.log(res.password);
                    })


                throw new Error('Запрос не выполнен' + response.status);

            }
            console.log('Запрос выполнен успепшно');
            // setShowPopup(true);
            return response.json();
        })
        .then(data => {
            console.log('Получены данные:', data);
        })
        .catch(err => {
            console.error('Ошибка:', err);
            // setShowError(true);
        });
}


// Вариант 2

// class MainApi {
//     constructor({ url, headers }) {
//         this._url = url;
//         this._headers = headers
//     }

//     // регистрация пользователя 
//     register(registrationData) {
//         return fetch(`${this._url}/api/users/`,
//             {
//                 method: 'POST',
//                 headers: this._headers,
//                 body: JSON.stringify(registrationData),

//             })
//             .then 
//     }
// }


// const mainApi = new MainApi({
//     url: "https://caseme.pythonanywhere.com",
//     headers: {
//         "content-type": "application/json",
//         "Authorization": "",
//     }
// })