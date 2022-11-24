const postData = async (url, data) => {     //Говорим функции что тут будет асинхронный код
    const res = await fetch(url, {      //Ставим await там где нам нужно дождаться выполнения операции
        method: "POST",
        headers: {
            'Content-type': 'application/json'
            },
        body: data
    });     //Так как это асинхронный код то респонс присовится к res только после получения данных и ниже мы получим ошибку
    return await res.json();  //Возвращаем в формате json чтобы в дальнейшем уже работать с json форматом и на это требуется время поэтому ставим await

};

const getResources = async (url) => {     //Говорим функции что тут будет асинхронный код
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);  //Оператор ошибки выкидвается //Throw это генератр исключений он прерывает выполнение функции или передает управление на ближайший блок catch
    }
    return await res.json();

};

export {postData};
export {getResources};