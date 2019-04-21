class Profile {
    constructor(username,firstName,lastName,password){
        this.username = username,
        this.firstName = firstName, 
        this.lastName = lastName ,
        this.password = password
    };

    authorization(name,pass) {
        (this.username == name && this.password == pass) ? console.log(`${this.firstName}, Вы успешно авторизованы` ) : console.log(`Неверные логин или пароль`);
    }

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Сумма ${amount} в валюте ${currency} добавлена пользователю ${this.username}`);
            callback(err, data);
        });
    }
};

const Petr  = new Profile ("petr","Пётр","Иванов","petrpass");
Petr.authorization('petr','petrpass');
Petr.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
    if (err) {
        console.error('Error during adding money to petr');
    } 
});

//Petr.addMoney({ currency: 'EUR', amount: 200 });
/*
function main() {
    const Ivan = new Profile({
        username :'ivan',
        name : { firstName : 'Ivan', lastName : 'Chernyshev' },
        password : 'ivanspass',
    });
    // сначала создаем и авторизуем пользователя

    // после того, как мы авторизовали пользователя, добавляем ему денег в кошелек
    Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
            console.error('Error during adding money to Ivan');
        } 
    });
}

main();
*/
